
const MockPerlinX = artifacts.require('MockPerlinX')
const Registry = artifacts.require('Registry')

module.exports = async (deployer, network, accounts) => {

    

    if (network === "kovan" || network === "development") {

        let perlinXAddress
        if (network === "development") {
            await deployer.deploy(MockPerlinX)
            perlinXAddress = MockPerlinX.address
        } else {
            perlinXAddress = "0x6a7D98Ff6D47175A75525a4193a8661493b828c5"
        }

        await deployer.deploy(Registry, perlinXAddress)

        const registryInstance = await Registry.at(Registry.address)

        // Add old pools...
        await registryInstance.listPool("0xadca601e5fcfe5595e68316c7aa2212e3ee2942d", "0xf4dd7571fbdc10b52290bab107d2fd5cd4320732", 100 )
        await registryInstance.listPool("0x1e6ef0e8913832f3d23373fab2e327a281af8906", "0x3e2e792587ceb6c1090a8a42f3efcfad818d266d", 100 )
        await registryInstance.listPool("0xd848915f4d25f7283e51c3e7c07c60ca4461f978", "0x3e2e792587ceb6c1090a8a42f3efcfad818d266d", 90 ) 
        await registryInstance.listPool("0xf64525a31f1e47cd1d24639d714b0541784c08f7", "0xea36c2a8a7ff187ceae81b34b38c63794a747c45", 100 )
        await registryInstance.listPool("0xafda367928e6fff4dce87ee4dd1adc249d3839ed", "0x5d35035a962de3933d68325a0e4595a58ce59488", 100 )

        



    }

}