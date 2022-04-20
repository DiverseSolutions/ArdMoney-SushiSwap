// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./proxy/TransparentUpgradeableProxy.sol";

contract ArdMoneyAMMFactoryProxy is TransparentUpgradeableProxy {
  mapping(string => bool) public booleanMap;
  mapping(string => uint256) public uintMap;
  mapping(string => int256) public intMap;
  mapping(string => address) public addressMap;
  uint public poolKeyCounter;

  event createdUniswapPool(address indexed _factory, address indexed _router);

  constructor(address _logic, address _proxyAdmin, address _poolFactoryAdmin ,bytes memory _data) TransparentUpgradeableProxy(_logic,_proxyAdmin,_data){
    addressMap["PoolFactoryOwner"] = _poolFactoryAdmin;
  }

}
