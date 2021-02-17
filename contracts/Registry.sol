pragma solidity ^0.6.0;


/**
 * @title PerlinX registry contract 
 */


interface IPerlinX {

    function isAdmin(address) external view returns (bool);

}

contract Registry {

    
    IPerlinX public perlinx;
    // clone from PerlinX contract
    address[] public arrayPerlinPools;
    mapping(address => bool) public poolWasListed; // Tracks if pool was ever listed
    mapping(address => uint256) public poolWeight; // Allows a reward weight to be applied; 100 = 1.0
    mapping(address => bool) public poolIsListed; // Tracks current listing status
    mapping(address => address) public mapPool_Asset; // Uniswap pools provide liquidity to non-PERL asset

    event NewPool(
        address indexed admin,
        address indexed pool,
        address indexed asset,
        uint256 assetWeight
    );

    // need to supply PerlinX address on the constructor
    constructor(
        address _perlinXAddress
    ) public {

        perlinx = IPerlinX(_perlinXAddress);

    }

    // Inherit admin permission from PerlinX contract
    modifier onlyAdmin() {
        require(perlinx.isAdmin(msg.sender), "Must be PerlinX's Admin");
        _;
    }

    function listPool(
        address pool,
        address asset,
        uint256 weight
    ) public onlyAdmin {
        require(
            (asset != address(0)) && (pool != address(0)),
            "Must pass address validation"
        );
        require(
            weight >= 10 && weight <= 1000,
            "Must be greater than 0.1, less than 10"
        );
        if (!poolWasListed[pool]) {
            arrayPerlinPools.push(pool);
        }
        poolIsListed[pool] = true; // Tracking listing
        poolWasListed[pool] = true; // Track if ever was listed
        poolWeight[pool] = weight; // Note: weight of 120 = 1.2
        mapPool_Asset[pool] = asset; // Map the pool to its non-perl asset
        emit NewPool(msg.sender, pool, asset, weight);
    }
    
    function delistPool(address pool) public onlyAdmin {
        poolIsListed[pool] = false;
    }
}