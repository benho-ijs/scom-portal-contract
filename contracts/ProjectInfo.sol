// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.13;

import "./Authorization.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./AuditorInfo.sol";

library StringCompare {
    function compare(string calldata s1, string storage s2) internal pure returns (bool) {
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
    }
}
contract ProjectInfo is Authorization, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using StringCompare for string;

    enum ProjectStatus {INACTIVE, ACTIVE}
    enum PackageStatus {INACTIVE, ACTIVE}
    enum PackageVersionStatus {AUDITING, AUDIT_PASSED, AUDIT_FAILED, VOIDED}

    struct Package {
        uint256 projectId;
        uint256 currVersionIndex;
        PackageStatus status;
        string ipfsCid;
    }
    struct SemVer {
        uint256 major;
        uint256 minor;
        uint256 patch;        
    }
    struct PackageVersion {
        uint256 packageId;
        SemVer version;
        PackageVersionStatus status;
        string ipfsCid;
        string reportUri;
    }
    
    IERC20 public immutable token;
    AuditorInfo public auditorInfo;
    // active package list
    uint256 public projectCount;
    uint256 private maxNameLength = 100;

    mapping(uint256 => uint256) public projectBalance; //projectBalance[projectId] = amount
    mapping(address => mapping(uint256 => uint256)) public projectBackerBalance; //projectBackerBalance[staker][projectId] = amount
    mapping(uint256 => string) public projectName; // projectName[projectId] = name
    mapping(string => uint256) public projectNameInv; //  projectNameInv[name] = projectId
    mapping(uint256 => string) public projectIpfsCid; // projectIpfsCid[projectId] = ipfsCid
    
    // project <-> owner / admin
    mapping(uint256 => address) public projectOwner; // projectOwner[projectId] = owner
    mapping(address => uint256[]) public ownersProjects; // ownersProjects[owner][ownersProjectsIdx] = projectId
    mapping(address => mapping(uint256 => uint256)) public ownersProjectsInv; // ownersProjectsInv[owner][projectId] = ownersProjectsIdx
    mapping(uint256 => address) public projectNewOwner; // projectNewOwner[projectId] = newOwner
    mapping(uint256 => address[]) public projectAdmin; // projectAdmin[projectId][idx] = admin
    mapping(uint256 => mapping(address => uint256)) public projectAdminInv; // projectAdminInv[projectId][admin] = idx

    // package
    Package[] public packages; // packages[packageId] = {projectId, currVersionIndex, status}
    PackageVersion[] public packageVersions; // packageVersions[packageVersionsId] = {packageId, version, status, ipfsCid}
    mapping(uint256 => uint256[]) public packageVersionsList; // packageVersionsList[packageId][idx] = packageVersionsId
    mapping(uint256 => PackageVersion) public latestAuditedPackageVersion; // latestAuditedPackageVersion[packageId] = {packageId, version, status, ipfsCid}
    mapping(uint256 => string) public packageName; // packageName[packageId] = name;
    mapping(string => uint256) public packageNameInv; // packageNameInv[name] = packageId;

    // package <-> admin
    mapping(uint256 => address[]) public packageAdmin; // packageAdmin[packageId][idx] = admin
    mapping(uint256 => mapping(address => uint256)) public packageAdminInv; // packageAdminInv[packageId][admin] = idx

    // project <-> package
    mapping(uint256 => uint256[]) public projectPackages; // projectPackages[projectId][projectPackagesIdx] = packageId
    mapping(uint256 => mapping(uint256 => uint256)) public projectPackagesInv; // projectPackagesInv[projectId][packageId] = projectPackagesIdx
    mapping(uint256 => uint256) private projectPackagesMaxName; // projectPackagesMaxName[projectId] = packageId

    event NewProject(uint256 indexed projectId, address indexed owner, string name, string ipfsCid);
    event UpdateProjectName(uint256 indexed projectId, string name);
    event UpdateProjectIpfsCid(uint256 indexed projectId, string ipfsCid);
    
    event TransferProjectOwnership(uint256 indexed projectId, address indexed newOwner);
    event AddAdmin(uint256 indexed projectId, address indexed admin);
    event RemoveAdmin(uint256 indexed projectId, address indexed admin);

    event NewPackage(uint256 indexed projectId, uint256 indexed packageId, string name, string ipfsCid);
    event UpdatePackageName(uint256 indexed packageId, string name);
    event UpdatePackageIpfsCid(uint256 indexed packageId, string ipfsCid);
    event NewPackageVersion(uint256 indexed packageId, uint256 indexed packageVersionId, SemVer version);
    event SetPackageVersionStatus(uint256 indexed packageId, uint256 indexed packageVersionId, PackageVersionStatus status);
    event AddPackageAdmin(uint256 indexed packageId, address indexed admin);
    event RemovePackageAdmin(uint256 indexed packageId, address indexed admin);

    event Stake(address indexed sender, uint256 indexed projectId, uint256 amount, uint256 newBalance);
    event Unstake(address indexed sender, uint256 indexed projectId, uint256 amount, uint256 newBalance);

    constructor(IERC20 _token, AuditorInfo _auditorInfo) {
        token = _token;
        auditorInfo = _auditorInfo;
    }

    modifier onlyProjectOwner(uint256 projectId) {
        require(projectOwner[projectId] == msg.sender, "not from owner");
        _;
    }

    modifier isProjectAdminOrOwner(uint256 projectId) {
        require(projectAdmin[projectId].length > 0 &&  
            projectAdmin[projectId][projectAdminInv[projectId][msg.sender]] == msg.sender 
            || projectOwner[projectId] == msg.sender
        , "not from admin");
        _;
    }

    modifier isProjectOwner(uint256 packageId) {
        require(packageId < packages.length, "invalid packageId");
        Package storage package = packages[packageId];
        uint256 projectId = package.projectId;
        require(projectOwner[package.projectId] == msg.sender, "not from owner");
        _;
    }

    modifier onlyActiveAuditor {
        require(auditorInfo.isActiveAuditor(msg.sender), "not from active auditor");
        _;
    }

    function ownersProjectsLength(address owner) external view returns (uint256 length) {
        length = ownersProjects[owner].length;
    }
    function projectAdminLength(uint256 projectId) external view returns (uint256 length) {
        length = projectAdmin[projectId].length;
    }
    function packagesLength() external view returns (uint256 length) {
        length = packages.length;
    }
    function packageVersionsLength() external view returns (uint256 length) {
        length = packageVersions.length;
    }
    function packageVersionsListLength(uint256 packageId) external view returns (uint256 length) {
        length = packageVersionsList[packageId].length;
    }
    function projectPackagesLength(uint256 projectId) external view returns (uint256 length) {
        length = projectPackages[projectId].length;
    }
    function _isValidName(string calldata name) internal view returns (bool) {
        // package name max length: 214, repository name max length: 100
        bytes memory bName = bytes(name);
        if (bName.length == 0 || bName.length >= maxNameLength) return false;
        // first char must be a-z0-9-
        if (
            bName[0] == 0x2d
            ||
            (bName[0] >= 0x30 && bName[0] <= 0x39) ||
            (bName[0] >= 0x61 && bName[0] <= 0x7a)
        ) {
            // Allowed characters: a-z0-9-._
            for (uint i = 1; i < bName.length; i++) {
                if (
                    !(bName[i] == 0x2d ||
                        bName[i] == 0x2e ||
                        bName[i] == 0x5f ||
                        (bName[i] >= 0x30 && bName[i] <= 0x39) ||
                        (bName[i] >= 0x61 && bName[i] <= 0x7a))
                ) return false;
            }
            return true;
        }
        return false;
    }

    function isValidProjectName(uint256 projectId, string calldata name) internal view returns (bool) {
        bytes memory bName = bytes(name);
        bytes memory bPackageName = bytes(packageName[projectPackagesMaxName[projectId]]);
        if ((bName.length + bPackageName.length) >= maxNameLength) return false;
        if (projectNameInv[name] != projectId && name.compare(projectName[projectNameInv[name]])) return false;
        return _isValidName(name);
    }
    
    function isValidPackageName(uint256 projectId, uint256 packageId, string calldata name) internal view returns (bool) {
        bytes memory bName = bytes(name);
        bytes memory bProjectName = bytes(projectName[projectId]);
        if ((bProjectName.length + bName.length) >= maxNameLength) return false;
        if (packageNameInv[name] != packageId && name.compare(packageName[packageNameInv[name]])) return false;
        return _isValidName(name);
    }

    //
    // functions called by project owners
    //
    function newProject(string calldata name, string calldata ipfsCid) external returns (uint256 projectId) {
        projectId = projectCount;
        require(isValidProjectName(projectId, name), "invalid project name");
        projectOwner[projectId] = msg.sender;
        ownersProjectsInv[msg.sender][projectId] = ownersProjects[msg.sender].length;
        ownersProjects[msg.sender].push(projectId);
        projectName[projectId] = name;
        projectNameInv[name] = projectId;
        projectIpfsCid[projectId] = ipfsCid;
        projectCount++;
        emit NewProject(projectId, msg.sender, name, ipfsCid);
    }
    function updateProjectName(uint256 projectId, string calldata name) external isProjectAdminOrOwner(projectId) {
        require(isValidProjectName(projectId, name), "invalid project name");
        delete projectNameInv[projectName[projectId]];
        projectName[projectId] = name;
        projectNameInv[name] = projectId;
        emit UpdateProjectName(projectId, name);
    }
    function updateProjectIpfsCid(uint256 projectId, string calldata ipfsCid) external isProjectAdminOrOwner(projectId) {
        require(projectId < projectCount, "invalid projectId");
        projectIpfsCid[projectId] = ipfsCid;
        emit UpdateProjectIpfsCid(projectId, ipfsCid);
    }
    function _removeProjectFromOwner(address owner, uint256 projectId) internal {
        // make sure the project ownership is checked !
        uint256 idx = ownersProjectsInv[owner][projectId];
        uint256 lastIdx = ownersProjects[owner].length - 1;
        if (idx < lastIdx) {
            uint256 lastProjectId = ownersProjects[owner][lastIdx];
            ownersProjectsInv[owner][lastProjectId] = idx;
            ownersProjects[owner][idx] = lastProjectId;
        }
        delete ownersProjectsInv[owner][projectId];
        ownersProjects[owner].pop();
    }
    function transferProjectOwnership(uint256 projectId, address newOwner) external onlyProjectOwner(projectId) {
        
        projectNewOwner[projectId] = newOwner;
    }
    function takeProjectOwnership(uint256 projectId) external {
        require(projectNewOwner[projectId] == msg.sender, "not from new owner");
        address prevOwner = projectOwner[projectId];
        projectOwner[projectId] = msg.sender;
        projectNewOwner[projectId] = address(0);

        _removeProjectFromOwner(prevOwner, projectId);

        emit TransferProjectOwnership(projectId, msg.sender);
    }
    function addProjectAdmin(uint256 projectId, address admin) external onlyProjectOwner(projectId) {
        require(projectAdmin[projectId].length == 0 || projectAdmin[projectId][projectAdminInv[projectId][admin]] != admin, "already a admin");
        projectAdminInv[projectId][admin] = projectAdmin[projectId].length;
        projectAdmin[projectId].push(admin);

        emit AddAdmin(projectId, admin);
    }
    function removeProjectAdmin(uint256 projectId, address admin) external onlyProjectOwner(projectId) {
        uint256 idx = projectAdminInv[projectId][admin];
        uint256 lastIdx = projectAdmin[projectId].length - 1;
        if (idx < lastIdx) {
            address lastAdmin = projectAdmin[projectId][lastIdx];
            projectAdminInv[projectId][lastAdmin] = idx;
            projectAdmin[projectId][idx] = lastAdmin;
        }
        delete projectAdminInv[projectId][admin];
        projectAdmin[projectId].pop();

        emit RemoveAdmin(projectId, admin);
    }
    function newPackage(uint256 projectId, string calldata name, string calldata ipfsCid) external isProjectAdminOrOwner(projectId) returns (uint256 packageId) {
        packageId = packages.length;
        require(isValidPackageName(projectId, packageId, name), "invalid package name");
        packages.push(Package({
            projectId: projectId,
            currVersionIndex: 0,
            status: PackageStatus.ACTIVE,
            ipfsCid: ipfsCid
        }));
        packageName[packageId] = name;
        packageNameInv[name] = packageId;
        projectPackages[projectId].push(packageId);
        bytes memory bName = bytes(name);
        bytes memory bPackageName = bytes(packageName[projectPackagesMaxName[projectId]]);
        if (bName.length > bPackageName.length) {
            projectPackagesMaxName[projectId] = packageId;
        }
        emit NewPackage(projectId, packageId, name, ipfsCid);
    }
    function updatePackageName(uint256 projectId, uint256 packageId, string calldata name) external isProjectAdminOrOwner(projectId) {
        require(isValidPackageName(projectId, packageId, name), "invalid package name");
        delete  packageNameInv[packageName[packageId]];
        packageName[packageId] = name;
        packageNameInv[name] = packageId;
        bytes memory bName = bytes(name);
        bytes memory bPackageName = bytes(packageName[projectPackagesMaxName[projectId]]);
        if (bName.length > bPackageName.length) {
            projectPackagesMaxName[projectId] = packageId;
        }
        emit UpdatePackageName(packageId, name);
    }
    function updatePackageIpfsCid(uint256 projectId, uint256 packageId, string calldata ipfsCid) external isProjectAdminOrOwner(projectId) {
        require(packageId < packages.length, "invalid packageId");
        Package storage package = packages[packageId];
        require(package.projectId == projectId, "projectId/packageId not match");
        package.ipfsCid = ipfsCid;
        emit UpdatePackageIpfsCid(packageId, ipfsCid);
    }
    function addPackageAdmin(uint256 packageId, address admin) external isProjectOwner(packageId) {
        require(packageAdmin[packageId].length == 0 || packageAdmin[packageId][packageAdminInv[packageId][admin]] != admin, "already a admin");
        packageAdminInv[packageId][admin] = packageAdmin[packageId].length;
        packageAdmin[packageId].push(admin);
        emit AddPackageAdmin(packageId, admin);
    }
    function removePackageAdmin(uint256 packageId, address admin) external isProjectOwner(packageId) {
        uint256 idx = packageAdminInv[packageId][admin];
        uint256 lastIdx = packageAdmin[packageId].length - 1;
        if (idx < lastIdx) {
            address lastAdmin = packageAdmin[packageId][lastIdx];
            packageAdminInv[packageId][lastAdmin] = idx;
            packageAdmin[packageId][idx] = lastAdmin;
        }
        delete packageAdminInv[packageId][admin];
        packageAdmin[packageId].pop();
        emit RemovePackageAdmin(packageId, admin);
    }

    function newPackageVersion(uint256 projectId, uint256 packageId, SemVer memory version, string calldata ipfsCid) public isProjectAdminOrOwner(projectId) returns (uint256 packageVersionId) {
        require(packageId < packages.length, "invalid packageId");
        require(packages[packageId].projectId == projectId, "projectId/packageId not match");
        uint256 versionsLength = packageVersionsList[packageId].length;
        if (versionsLength > 0) {
            uint256 lastVersionId = packageVersionsList[packageId][versionsLength - 1];
            PackageVersion memory lastPackageVersion = packageVersions[lastVersionId];
            if (lastPackageVersion.version.major == version.major) {
                if (lastPackageVersion.version.minor == version.minor) {
                    require(version.patch > lastPackageVersion.version.patch, "patch version must be bumped");
                }
                else {
                    require(version.minor > lastPackageVersion.version.minor, "minor version must be bumped");
                }
            }
            else {
                require(version.major > lastPackageVersion.version.major, "major version must be bumped");
            }
        }        
        packageVersionId = packageVersions.length;
        packageVersionsList[packageId].push(packageVersionId);
        packageVersions.push(PackageVersion({
            packageId: packageId,
            version: version,
            status: PackageVersionStatus.AUDITING,
            ipfsCid: ipfsCid,
            reportUri: ""
        }));

        emit NewPackageVersion(packageId, packageVersionId, version);
    }

    function _setPackageVersionStatus(PackageVersion storage packageVersion, uint256 packageVersionId, PackageVersionStatus status) internal {
        packageVersion.status = status;
        emit SetPackageVersionStatus(packageVersion.packageId, packageVersionId, status);
    }

    function voidPackageVersion(uint256 packageVersionId) external {
        require(packageVersionId < packageVersions.length, "invalid packageVersionId");
        PackageVersion storage packageVersion = packageVersions[packageVersionId];
        require(packageVersion.status != PackageVersionStatus.VOIDED, "already voided");
        require(packageVersion.status != PackageVersionStatus.AUDIT_PASSED, "Audit passed version cannot be voided");
        _setPackageVersionStatus(packageVersion, packageVersionId, PackageVersionStatus.VOIDED);
    }
    function setPackageVersionToAuditPassed(uint256 packageVersionId, string calldata reportUri) external onlyActiveAuditor {
        require(packageVersionId < packageVersions.length, "invalid packageVersionId");
        PackageVersion storage packageVersion = packageVersions[packageVersionId];
        require(packageVersion.status == PackageVersionStatus.AUDITING, "not under auditing");
        latestAuditedPackageVersion[packageVersion.packageId] = packageVersion;
        packageVersion.reportUri = reportUri;
        _setPackageVersionStatus(packageVersion, packageVersionId, PackageVersionStatus.AUDIT_PASSED);
    } 
    function setPackageVersionToAuditFailed(uint256 packageVersionId, string calldata reportUri) external onlyActiveAuditor {
        require(packageVersionId < packageVersions.length, "invalid packageVersionId");
        PackageVersion storage packageVersion = packageVersions[packageVersionId];
        require(packageVersion.status == PackageVersionStatus.AUDITING, "not under auditing");
        packageVersion.reportUri = reportUri;
        _setPackageVersionStatus(packageVersion, packageVersionId, PackageVersionStatus.AUDIT_FAILED);
    }         

    function stake(uint256 projectId, uint256 amount) external nonReentrant {
        require(amount > 0, "amount = 0");
        amount = _transferTokenFrom(amount);
        uint256 newBalance = projectBackerBalance[msg.sender][projectId] + amount;
        projectBackerBalance[msg.sender][projectId] = newBalance;
        projectBalance[projectId] += amount;
        emit Stake(msg.sender, projectId, amount, newBalance);
    }

    function unstake(uint256 projectId, uint256 amount) external nonReentrant {
        require(amount > 0, "amount = 0");
        uint256 newBalance = projectBackerBalance[msg.sender][projectId] - amount;
        projectBackerBalance[msg.sender][projectId] = newBalance;
        projectBalance[projectId] -= amount;
        token.safeTransfer(msg.sender, amount);
        emit Unstake(msg.sender, projectId, amount, newBalance);
    }

    function _transferTokenFrom(uint amount) internal returns (uint256 balance) {
        balance = token.balanceOf(address(this));
        token.safeTransferFrom(msg.sender, address(this), amount);
        balance = token.balanceOf(address(this)) - balance;
    }
}