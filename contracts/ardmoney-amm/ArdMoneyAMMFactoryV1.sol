// SPDX-License-Identifier: MIT
pragma solidity =0.6.12;

import "./StandardUniswapV2Factory.sol";
import "./StandardUniswapV2Router02.sol";

contract ArdMoneyAMMFactoryV1 {
  mapping(string => bool) public booleanMap;
  mapping(string => uint256) public uintMap;
  mapping(string => int256) public intMap;
  mapping(string => address) public addressMap;
  uint public poolKeyCounter;

  event createdUniswapPool(address indexed _factory, address indexed _router);

  function createUniswapPool(string memory _poolFactoryName,string memory _poolRouterName,address _feeSetter,address _WETH) external{
    require(addressMap["PoolFactoryOwner"] != address(0),"ARDMONEY : No Pool Factory Owner Detected!");
    require(addressMap["PoolFactoryOwner"] == msg.sender,"ARDMONEY : Not Pool Factory Owner!");

    StandardUniswapV2Factory _factory = new StandardUniswapV2Factory(_feeSetter);
    StandardUniswapV2Router02 _router = new StandardUniswapV2Router02(address(_factory),_WETH);

    addressMap[_poolFactoryName] = address(_factory);
    addressMap[_poolRouterName] = address(_router);

    poolKeyCounter += 1;

    emit createdUniswapPool(address(_factory),address(_router));
  }

}
