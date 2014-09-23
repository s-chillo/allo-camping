package com.allocamping.core;

import java.io.IOException;
import java.util.List;

import com.allocamping.communs.models.Camping;
import com.allocamping.dao.CampingDao;
import com.google.code.geocoder.Geocoder;
import com.google.code.geocoder.GeocoderRequestBuilder;
import com.google.code.geocoder.model.GeocodeResponse;
import com.google.code.geocoder.model.GeocoderRequest;
import com.google.code.geocoder.model.LatLng;

public class CampingCore {
	
	final Geocoder  geocoder = new Geocoder();
	CampingDao campingDao = new CampingDao();
	public void addCamping(Camping camping) {
		GeocodeResponse geocoderResponse = null;
		GeocoderRequest geocoderRequest = new GeocoderRequestBuilder().setAddress(camping.getAdresse()).setLanguage("en").getGeocoderRequest();
		try {
			geocoderResponse = geocoder.geocode(geocoderRequest);
			
			LatLng coordonnees = geocoderResponse.getResults().get(0).getGeometry().getLocation();
			camping.setLatitude(coordonnees.getLat().floatValue());
			camping.setLongitude(coordonnees.getLng().floatValue());
		} catch (IOException e) {
			e.printStackTrace();
		}
		campingDao.addCamping(camping);

	}
	public List<Camping> getCampings() {
		List<Camping> campings = campingDao.getCampings();
		for (Camping camping : campings) {
			camping.setIdStringValue(camping.getId().toString());
		}
		return campings;
	}
	
	public  Camping getCamping(String id) {
		Camping camping = campingDao.getCamping(id);
		return camping;
	}

	public List<Camping> rechercherCamping(String ville) {
		List<Camping> campings = campingDao.rechercherCamping(ville);
		return campings;
	}
	
	
	

}
