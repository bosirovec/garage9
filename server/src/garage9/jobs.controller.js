import mongodb from 'mongodb';
import { database } from '../database/database.js';
import { JobsService } from './jobs.service.js';
import * as fs from 'fs';


const collection = database.collection('jobs');
export class JobsController{
        
    static async create(req,res){
        const job = req.body;
        await JobsService.create(job);
        res.status(201);
        res.send(JobsController._mapToViewModel(job));
    }

    static async get(req,res){
        const jobs = await JobsService.find();
        res.send(jobs.map(JobsController._mapToViewModel));
    }

    static async getById(req,res){
        const job = await JobsService.findById(req.params.id);
        if(!job){
            res.status(404);
            res.send({error : "Not found"});
            return;
        }
        res.send(JobsController._mapToViewModel(job));
    }

    static async delete(req,res){
        const deleted  = await JobsService.delete(req.params.id);
        if(!deleted){
            res.status(404);
            res.send({error: "Not found"});
            return;
        }
        res.send();
    }

    static _mapToViewModel(job){
        job.id = job._id;
        delete job._id;
        return job;
    };

    static async download(req,res){
        const job = await JobsService.findById(req.params.id);

        if(!job){
            res.status(404);
            res.send({error : "Not found"});
            return;
        }
        
        res.writeHead(200, {
            'Content-Type': 'application/json-my-attachment',
            "content-disposition": "attachment; filename=\"my json file.json\""
        });
        console.log("body : " + JSON.stringify(job));

        res.end(JSON.stringify(job));
        
        
    }}
