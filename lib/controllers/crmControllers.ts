import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);
export class ContactController{
    public addNewContact (req: Request, res: Response) {
        let newContact = new Contact(req.body);
    
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }
    public getContacts (req: Request, res: Response) {
        Contact.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }
    public getContactWithID (req: Request, res: Response) {
        Contact.findById(req.params.contactId, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }
    public updateContact (req: Request, res: Response) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }
    public deleteContact (req: Request, res: Response) {
        Contact.findOneAndDelete({ _id: req.params.contactId }, (err, deletedContact) => {
            if(err){
                res.send(err);
            }
            if(deletedContact) {
                console.log("Deleted Contact :: ", deletedContact);
                res.json({ message: 'Successfully deleted contact!'},);
            } else {
                res.status(404).json({message: "No Contact Found!!!"})
            }
        });
    }
}