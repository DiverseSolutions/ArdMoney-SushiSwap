// SPDX-License-Identifier: GPL-3.0

pragma solidity =0.6.12;

import "./interfaces/IUniswapV2DynamicFee.sol";
import "./UniswapV2ERC20.sol";


contract UniswapV2DynamicFee is IUniswapV2DynamicFee {
    using SafeMathUniswap for uint256;

    address public admin;
    uint256 public swapFee;  // 3 = 0.3% 

    constructor(uint256 _swapFee, address _admin) public {
        swapFee = _swapFee; 
        admin = _admin;
    }

        function getAdmin() public override returns(address) {
        return admin;
    }

    function setAdmin(address _admin) private {
        require(msg.sender == admin, "You need to be an admin to make changes");
        admin = _admin;
    }

    function getSwapFee() public override returns (uint256){
        return swapFee;
    }

    function setSwapFee(uint256 _swapFee) private {
        require(msg.sender == admin, "You need to be an admin to make changes");
        swapFee = _swapFee;
    }
}
