package com.allocamping.services;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import com.allocamping.communs.models.Camping;
import com.allocamping.core.CampingCore;
@Path("/camping")
public class CampingServices {
	
	CampingCore campingCore = new CampingCore();
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void addCamping(Camping camping) {
		campingCore.addCamping(camping);
	}

	@GET
	public List<Camping> getCampings() {		
		List<Camping> campings = campingCore.getCampings();
		return campings;
	}
	
	/*
	@GET
	public List<Camping> getrechCampings(String ville) {
		List<Camping> campings = campingCore.rechercherCamping(ville);
		return campings;
	}
	*/
	
	@GET
	@Path("{id}")
	public Camping getCamping(@PathParam("id") String id) {
		Camping camping = campingCore.getCamping(id);
		return camping;
	}
}


