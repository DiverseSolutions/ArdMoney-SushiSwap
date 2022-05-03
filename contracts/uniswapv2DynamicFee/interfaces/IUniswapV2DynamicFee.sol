// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

interface IUniswapV2DynamicFee {
    
    function getAdmin() external returns(address);
    function getSwapFee() external returns(uint256);
}