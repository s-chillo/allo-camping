package com.allocamping.dao;

import java.net.UnknownHostException;
import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.allocamping.communs.models.Camping;
import com.allocamping.communs.models.Utilisateur;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;

public class CampingDao {
	
	
	public void addCamping(Camping camping) {
		Mongo mongo = null;
		try {
			mongo = new MongoClient();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		Morphia morphia = new Morphia();
		morphia.map(Camping.class);
		Datastore ds = morphia.createDatastore(mongo, "allocamping");
		
		ds.save(camping);
	}
	
	public List<Camping> getCampings() {
		Mongo mongo = null;
		try {
			mongo = new MongoClient();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		Morphia morphia = new Morphia();
		Datastore ds = morphia.createDatastore(mongo, "allocamping");
		
		List<Camping> campings = ds.find(Camping.class).asList();

	return campings;
	}
	
	/**
	 * 
	 * @param id du camping
	 * @return camping
	 */
	public Camping getCamping(String id) {
		
		Mongo mongo = null;
		try {
			mongo = new MongoClient();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		Morphia morphia = new Morphia();
		Datastore ds = morphia.createDatastore(mongo, "allocamping");
		
		Camping camping = ds.find(Camping.class).field("_id").equal(new ObjectId(id)).get();
		return camping;
	}
	
	/**
	 * @param ville
	 * @return liste des camping d'une  ville
	 */
	public List<Camping> rechercherCamping(String ville) {
		Mongo mongo = null;
		try {
			mongo = new MongoClient();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		Morphia morphia = new Morphia();
		Datastore ds = morphia.createDatastore(mongo, "allocamping");
		
		List<Camping> campings =ds.find(Camping.class, "ville", ville).asList();

		return campings;
	}



}
