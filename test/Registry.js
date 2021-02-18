const Registry = artifacts.require('Registry');
const MockPerlinX = artifacts.require('MockPerlinX');


contract('Registry', accounts => {

    let instance

    const admin = accounts[0]
    const user = accounts[1]

    const dummyPool = "0x8595dd9e0438640b5e1254f9df579ac12a86865f"
    const dummyAsset = "0x829bd824b016326a401d083b33d092293333a830"

    beforeEach(async () => {
        const PerlinXInstance = await MockPerlinX.new({ from: admin })
        instance = await Registry.new(PerlinXInstance.address, { from: user });
    });


    it('verify that only admin from PerlinX can list a pool', async () => {

        try {
            await instance.listPool(dummyPool, dummyAsset, 100, { from: user })
        } catch (error) {
            assert.ok(error.message.includes("Must be PerlinX's Admin"))
        }
        await instance.listPool(dummyPool, dummyAsset, 100, { from: admin })
        const isListed = await instance.poolIsListed( dummyPool )
        assert.ok(isListed)
        

    });

    it('verify that only admin from PerlinX can delist a pool', async () => {

        await instance.listPool(dummyPool, dummyAsset, 100, { from: admin })
        const isListed = await instance.poolIsListed( dummyPool )
        assert.ok(isListed)
        try {
            await instance.delistPool(dummyPool, { from: user })
        } catch (error) {
            assert.ok(error.message.includes("Must be PerlinX's Admin"))
        }

        await instance.delistPool(dummyPool, { from: admin })
        const isListed2 = await instance.poolIsListed( dummyPool )
        assert.ok(!isListed2)


    });



})