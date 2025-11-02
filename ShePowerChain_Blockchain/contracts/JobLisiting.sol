// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract JobListing {
    struct Job {
        uint256 id;
        string title;
        string description;
        address employer;
        bool active;
    }

    uint256 public nextJobId;
    mapping(uint256 => Job) public jobs;

    event JobCreated(uint256 id, string title, address employer);
    event JobClosed(uint256 id);

    function createJob(string memory _title, string memory _description) public {
        jobs[nextJobId] = Job(nextJobId, _title, _description, msg.sender, true);
        emit JobCreated(nextJobId, _title, msg.sender);
        nextJobId++;
    }

    function closeJob(uint256 _id) public {
        require(jobs[_id].employer == msg.sender, "Not your job");
        jobs[_id].active = false;
        emit JobClosed(_id);
    }
}

