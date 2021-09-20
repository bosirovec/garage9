import mongodb from 'mongodb';
import { database } from '../database/database.js';

export class JobsService{
    static _collection = database.collection('jobs');
    
    static async create(job){
        await JobsService._collection.insertOne(job);
    }

    static async find(){
        return await JobsService._collection.find().toArray();
    }


    static async findById(id){
        id = mongodb.ObjectId(id);
        return JobsService._collection.findOne({_id : id});
    }

    static async delete(id){
        id = mongodb.ObjectId(id);
        const deletedCount = (await JobsService._collection.deleteOne({_id : id})).deletedCount;
        if(deletedCount === 0 ){
            return false;
        }
        return true;
    }
}