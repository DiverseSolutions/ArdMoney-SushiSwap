// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./proxy/TransparentUpgradeableProxy.sol";

contract ArdMoneyAMMFactory is TransparentUpgradeableProxy {

  constructor(address _logic, address admin_, bytes memory _data) TransparentUpgradeableProxy(_logic,admin_,_data){

  }

}
