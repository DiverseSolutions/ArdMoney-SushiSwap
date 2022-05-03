// SPDX-License-Identifier: GPL-3.0

pragma solidity =0.6.12;

contract UniswapV2DynamicFee is UniswapV2DynamicFee {
    using SafeMathUniswap for uint256;

    address public admin;
    uint256 public swapFee;  // 3 = 0.3% 

    modifier ensure(uint256 deadline) {
        require(deadline >= block.timestamp, "UniswapV2Router: EXPIRED");
        _;
    }

    constructor(uint256 _swapFee, address _admin) public {
        swapFee = _swapFee; 
        admin = _admin;
    }

        function getAdmin() public returns(address) {
        return admin;
    }

    function setAdmin(address _admin) private {
        require(msg.sender == admin, "You need to be an admin to make changes");
        admin = _admin;
    }

    function getSwapFee() public external  returns (uint256){
        return swapFee;
    }

    function setSwapFee(uint256 _swapFee) private {
        require(msg.sender == admin, "You need to be an admin to make changes");
        swapFee = _swapFee;
    }
}
