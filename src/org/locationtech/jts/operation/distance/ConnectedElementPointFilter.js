import LineString from '../../geom/LineString';
import Point from '../../geom/Point';
import Polygon from '../../geom/Polygon';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../../geom/GeometryFilter';
export default class ConnectedElementPointFilter {
	constructor(...args) {
		this.pts = null;
		if (args.length === 1) {
			let [pts] = args;
			this.pts = pts;
		}
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	static getCoordinates(geom) {
		var pts = new ArrayList();
		geom.apply(new ConnectedElementPointFilter(pts));
		return pts;
	}
	filter(geom) {
		if (geom instanceof Point || geom instanceof LineString || geom instanceof Polygon) this.pts.add(geom.getCoordinate());
	}
	getClass() {
		return ConnectedElementPointFilter;
	}
}
