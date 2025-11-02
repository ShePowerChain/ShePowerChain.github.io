import { ethers } from 'ethers';

// Import ABIs
import JobMarketplaceABI from './abis/JobMarketplace.json';
import MentorshipABI from './abis/Mentorship.json';
import SkillVerificationABI from './abis/SkillVerification.json';

// Get contract addresses from environment variables
const CONTRACT_ADDRESSES = {
  JobMarketplace: import.meta.env.VITE_JOB_MARKETPLACE_CONTRACT_ADDRESS,
  SkillVerification: import.meta.env.VITE_SKILL_VERIFICATION_CONTRACT_ADDRESS,
  Mentorship: import.meta.env.VITE_MENTORSHIP_CONTRACT_ADDRESS,
};

// Type guard to check if a contract name is valid
function isValidContractName(name: string): name is keyof typeof CONTRACT_ADDRESSES {
  return name in CONTRACT_ADDRESSES;
}

import type { Ethereum } from '../types';

declare const window: { ethereum?: Ethereum };

export function getProvider() {
  if (!window.ethereum) throw new Error('No wallet detected');
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getContract(contractName: keyof typeof CONTRACT_ADDRESSES) {
  const provider = getProvider();
  const signer = await provider.getSigner();
  let abi, address;

  if (!isValidContractName(contractName)) {
    throw new Error(`Unknown contract: ${contractName}`);
  }

  const contractAddress = CONTRACT_ADDRESSES[contractName];
  if (!contractAddress) {
    throw new Error(`Missing address for contract: ${contractName}`);
  }

  switch (contractName) {
    case 'JobMarketplace':
      abi = JobMarketplaceABI;
      address = contractAddress;
      break;
    case 'SkillVerification':
      abi = SkillVerificationABI;
      address = contractAddress;
      break;
    case 'Mentorship':
      abi = MentorshipABI;
      address = contractAddress;
      break;
    default:
      throw new Error(`Unknown contract: ${contractName}`);
  }

  return new ethers.Contract(address, abi, signer);
}

// Example: Post a job
export async function addJobPosting(jobHash: string) {
  const contract = await getContract('JobMarketplace');
  const tx = await contract.addJobPosting(jobHash);
  return tx;
}

// Example: Apply to a job
export async function applyToJob(jobId: number, resumeHash: string) {
  if (!resumeHash || resumeHash.length === 0) {
    throw new Error('A valid resume hash is required to apply for a job.');
  }
  const contract = await getContract('JobMarketplace');
  const tx = await contract.applyToJob(jobId, resumeHash);
  return tx;
}

// Example: Verify a skill
export async function verifySkill(skillHash: string) {
  const contract = await getContract('SkillVerification');
  const tx = await contract.verifySkill(skillHash);
  return tx;
}

// Example: Request mentorship
export async function requestMentorship(mentor: string, requestHash: string) {
  const contract = await getContract('Mentorship');
  const tx = await contract.requestMentorship(mentor, requestHash);
  return tx;
}
