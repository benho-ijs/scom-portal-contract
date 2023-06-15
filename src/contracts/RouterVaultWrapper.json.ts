export default {
"abi":[
{"inputs":[{"internalType":"contract Vault","name":"_vault","type":"address"},{"internalType":"contract IOSWAP_HybridRouter2","name":"_router","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Authorize","type":"event"},
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Deauthorize","type":"event"},
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"StartOwnershipTransfer","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"trancheId","type":"uint256"},{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"inToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"inAmount","type":"uint256"}],"name":"Swap","type":"event"},
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"TransferOwnership","type":"event"},
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IOSWAP_HybridRouter2","name":"router","type":"address"}],"name":"UpdateRouter","type":"event"},
{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"deny","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isPermitted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"router","outputs":[{"internalType":"contract IOSWAP_HybridRouter2","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address[]","name":"pair","type":"address[]"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"trancheId","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"allocation","type":"uint256"},{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"swapExactTokensForTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address[]","name":"pair","type":"address[]"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"trancheId","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"allocation","type":"uint256"},{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"swapTokensForExactTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"takeOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"newOwner_","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"contract IOSWAP_HybridRouter2","name":"_router","type":"address"}],"name":"updateRouter","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"vault","outputs":[{"internalType":"contract Vault","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"weth","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}
],
"bytecode":"60806040523480156200001157600080fd5b5060405162001f8838038062001f88833981016040819052620000349162000112565b60008054336001600160a01b0319918216179091556003805482166001600160a01b038581169182179092556004805490931691841691909117825560408051633fc8cef360e01b815290519192633fc8cef39282820192602092908290030181865afa158015620000aa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000d0919062000151565b600580546001600160a01b0319166001600160a01b039290921691909117905550620001789050565b6001600160a01b03811681146200010f57600080fd5b50565b600080604083850312156200012657600080fd5b82516200013381620000f9565b60208401519092506200014681620000f9565b809150509250929050565b6000602082840312156200016457600080fd5b81516200017181620000f9565b9392505050565b611e0080620001886000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c8063a2f55ae51161008c578063d4ee1d9011610066578063d4ee1d90146101ea578063f2fde38b1461020a578063f887ea401461021d578063fbfa77cf1461023d57600080fd5b8063a2f55ae5146101b1578063b65b23c1146101c4578063c851cc32146101d757600080fd5b806362503e7c116100bd57806362503e7c1461016b5780638da5cb5b1461017e5780639c52a7f11461019e57600080fd5b80633fc8cef3146100e45780633fd8cc4e1461012e5780636053617214610161575b600080fd5b6005546101049073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b61015161013c3660046117af565b60026020526000908152604090205460ff1681565b6040519015158152602001610125565b61016961025d565b005b610169610179366004611818565b61038c565b6000546101049073ffffffffffffffffffffffffffffffffffffffff1681565b6101696101ac3660046117af565b6107a8565b6101696101bf3660046117af565b61084f565b6101696101d2366004611818565b6108f2565b6101696101e53660046117af565b610dc2565b6001546101049073ffffffffffffffffffffffffffffffffffffffff1681565b6101696102183660046117af565b610ed4565b6004546101049073ffffffffffffffffffffffffffffffffffffffff1681565b6003546101049073ffffffffffffffffffffffffffffffffffffffff1681565b60015473ffffffffffffffffffffffffffffffffffffffff163314610309576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b323314801561039a5750333b155b610400576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f4e6f742066726f6d20656e6420757365720000000000000000000000000000006044820152606401610300565b600080600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b66bd67c8d8d600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b815260040161048493929190611926565b600060405180830381865afa1580156104a1573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526104e79190810190611a76565b9050806000815181106104fc576104fc611aab565b602002602001015191505061051281338b610f6b565b60045490995061053c9073ffffffffffffffffffffffffffffffffffffffff83811691168b6110c2565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166365d9e64b8b8b8f8f87600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168f600067ffffffffffffffff8111156105bf576105bf611960565b6040519080825280601f01601f1916602001820160405280156105e9576020820181803683370190505b506040518963ffffffff1660e01b815260040161060d989796959493929190611b50565b6000604051808303816000875af115801561062c573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526106729190810190611bbc565b6003546040517f8ad30c8d00000000000000000000000000000000000000000000000000000000815291935073ffffffffffffffffffffffffffffffffffffffff169150638ad30c8d906106d4908a9033908b908b908b908b90600401611c77565b6020604051808303816000875af11580156106f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107179190611d02565b50867fee16dac19b14281c11b058c92c0f31a14e74cd4be2e49cd88ea9c13afe9a529833848460008151811061074f5761074f611aab565b60200260200101516040516107929392919073ffffffffffffffffffffffffffffffffffffffff9384168152919092166020820152604081019190915260600190565b60405180910390a2505050505050505050505050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146107cc57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b60005473ffffffffffffffffffffffffffffffffffffffff16331461087357600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf59101610844565b32331480156109005750333b155b610966576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f4e6f742066726f6d20656e6420757365720000000000000000000000000000006044820152606401610300565b600080600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b66bd67c8d8d600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b81526004016109ea93929190611926565b600060405180830381865afa158015610a07573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610a4d9190810190611a76565b905080600081518110610a6257610a62611aab565b6020026020010151915050610a7881338a610f6b565b600454909850610aa29073ffffffffffffffffffffffffffffffffffffffff83811691168a6110c2565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c1385f248b8b8f8f600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168f600067ffffffffffffffff811115610b4757610b47611960565b6040519080825280601f01601f191660200182016040528015610b71576020820181803683370190505b506040518963ffffffff1660e01b8152600401610b95989796959493929190611b50565b6000604051808303816000875af1158015610bb4573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610bfa9190810190611bbc565b6003546040517f8ad30c8d00000000000000000000000000000000000000000000000000000000815291935073ffffffffffffffffffffffffffffffffffffffff169150638ad30c8d90610c5c908a9033908b908b908b908b90600401611c77565b6020604051808303816000875af1158015610c7b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9f9190611d02565b50867fee16dac19b14281c11b058c92c0f31a14e74cd4be2e49cd88ea9c13afe9a5298338484600081518110610cd757610cd7611aab565b6020026020010151604051610d1a9392919073ffffffffffffffffffffffffffffffffffffffff9384168152919092166020820152604081019190915260600190565b60405180910390a280600081518110610d3557610d35611aab565b6020026020010151891115610db457610d8c3382600081518110610d5b57610d5b611aab565b60200260200101518b610d6e9190611d4a565b73ffffffffffffffffffffffffffffffffffffffff85169190611244565b600454610db49073ffffffffffffffffffffffffffffffffffffffff8481169116600061129f565b505050505050505050505050565b3360009081526002602052604090205460ff16610e61576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610300565b600480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527fd5f5b4d616f94f5e10b2955392470790b3fdde7c0c0b68bd1f3ea635e2caa8d790602001610844565b60005473ffffffffffffffffffffffffffffffffffffffff163314610ef857600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b90602001610844565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015610fd8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ffc9190611d02565b905061102073ffffffffffffffffffffffffffffffffffffffff8516843085611421565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8616906370a0823190602401602060405180830381865afa15801561108c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110b09190611d02565b6110ba9190611d4a565b949350505050565b6040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8381166024830152600091839186169063dd62ed3e90604401602060405180830381865afa158015611139573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061115d9190611d02565b6111679190611d61565b60405173ffffffffffffffffffffffffffffffffffffffff851660248201526044810182905290915061123e9085907f095ea7b300000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff000000000000000000000000000000000000000000000000000000009093169290921790915261147f565b50505050565b60405173ffffffffffffffffffffffffffffffffffffffff831660248201526044810182905261129a9084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064016111bc565b505050565b80158061133f57506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa158015611319573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061133d9190611d02565b155b6113cb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e6365000000000000000000006064820152608401610300565b60405173ffffffffffffffffffffffffffffffffffffffff831660248201526044810182905261129a9084907f095ea7b300000000000000000000000000000000000000000000000000000000906064016111bc565b60405173ffffffffffffffffffffffffffffffffffffffff8085166024830152831660448201526064810182905261123e9085907f23b872dd00000000000000000000000000000000000000000000000000000000906084016111bc565b60006114e1826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff1661158b9092919063ffffffff16565b80519091501561129a57808060200190518101906114ff9190611d79565b61129a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610300565b60606110ba84846000856115a1565b9392505050565b606082471015611633576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610300565b73ffffffffffffffffffffffffffffffffffffffff85163b6116b1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610300565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516116da9190611d9b565b60006040518083038185875af1925050503d8060008114611717576040519150601f19603f3d011682016040523d82523d6000602084013e61171c565b606091505b509150915061172c828286611737565b979650505050505050565b6060831561174657508161159a565b8251156117565782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103009190611db7565b73ffffffffffffffffffffffffffffffffffffffff811681146117ac57600080fd5b50565b6000602082840312156117c157600080fd5b813561159a8161178a565b60008083601f8401126117de57600080fd5b50813567ffffffffffffffff8111156117f657600080fd5b6020830191508360208260051b850101111561181157600080fd5b9250929050565b6000806000806000806000806000806101008b8d03121561183857600080fd5b8a3567ffffffffffffffff8082111561185057600080fd5b61185c8e838f016117cc565b909c509a5060208d0135995060408d0135985060608d0135975060808d0135965060a08d0135915061188d8261178a565b90945060c08c0135935060e08c013590808211156118aa57600080fd5b506118b78d828e016117cc565b915080935050809150509295989b9194979a5092959850565b8183526000602080850194508260005b8581101561191b5781356118f38161178a565b73ffffffffffffffffffffffffffffffffffffffff16875295820195908201906001016118e0565b509495945050505050565b60408152600061193a6040830185876118d0565b905073ffffffffffffffffffffffffffffffffffffffff83166020830152949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156119d6576119d6611960565b604052919050565b600067ffffffffffffffff8211156119f8576119f8611960565b5060051b60200190565b600082601f830112611a1357600080fd5b81516020611a28611a23836119de565b61198f565b82815260059290921b84018101918181019086841115611a4757600080fd5b8286015b84811015611a6b578051611a5e8161178a565b8352918301918301611a4b565b509695505050505050565b600060208284031215611a8857600080fd5b815167ffffffffffffffff811115611a9f57600080fd5b6110ba84828501611a02565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60005b83811015611af5578181015183820152602001611add565b8381111561123e5750506000910152565b60008151808452611b1e816020860160208601611ada565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b88815287602082015260e060408201526000611b7060e08301888a6118d0565b73ffffffffffffffffffffffffffffffffffffffff87811660608501528616608084015260a0830185905282810360c0840152611bad8185611b06565b9b9a5050505050505050505050565b60008060408385031215611bcf57600080fd5b825167ffffffffffffffff80821115611be757600080fd5b611bf386838701611a02565b9350602091508185015181811115611c0a57600080fd5b85019050601f81018613611c1d57600080fd5b8051611c2b611a23826119de565b81815260059190911b82018301908381019088831115611c4a57600080fd5b928401925b82841015611c6857835182529284019290840190611c4f565b80955050505050509250929050565b868152600073ffffffffffffffffffffffffffffffffffffffff808816602084015280871660408401525084606083015260a060808301528260a08301527f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff831115611ce257600080fd5b8260051b808560c08501376000920160c001918252509695505050505050565b600060208284031215611d1457600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082821015611d5c57611d5c611d1b565b500390565b60008219821115611d7457611d74611d1b565b500190565b600060208284031215611d8b57600080fd5b8151801515811461159a57600080fd5b60008251611dad818460208701611ada565b9190910192915050565b60208152600061159a6020830184611b0656fea2646970667358221220709ae6b1868aad7d078a4b10c07c72068946084a282e4d4141fbd0cbae2adcb564736f6c634300080d0033"
}