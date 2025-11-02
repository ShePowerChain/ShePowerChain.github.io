async function main() {
  const JobListing = await ethers.getContractFactory("JobListing");
  const jobListing = await JobListing.deploy();
  await jobListing.waitForDeployment();
  console.log("Contract deployed to:", await jobListing.getAddress());
  console.log(`JobListing deployed to: ${jobListing.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

