import Coordinate from '../geom/Coordinate';
import RobustLineIntersector from './RobustLineIntersector';
import Envelope from '../geom/Envelope';
export default class RectangleLineIntersector {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.rectEnv = null;
		this.diagUp0 = null;
		this.diagUp1 = null;
		this.diagDown0 = null;
		this.diagDown1 = null;
		if (args.length === 1) {
			let [rectEnv] = args;
			this.rectEnv = rectEnv;
			this.diagUp0 = new Coordinate(rectEnv.getMinX(), rectEnv.getMinY());
			this.diagUp1 = new Coordinate(rectEnv.getMaxX(), rectEnv.getMaxY());
			this.diagDown0 = new Coordinate(rectEnv.getMinX(), rectEnv.getMaxY());
			this.diagDown1 = new Coordinate(rectEnv.getMaxX(), rectEnv.getMinY());
		}
	}
	get interfaces_() {
		return [];
	}
	intersects(p0, p1) {
		var segEnv = new Envelope(p0, p1);
		if (!this.rectEnv.intersects(segEnv)) return false;
		if (this.rectEnv.intersects(p0)) return true;
		if (this.rectEnv.intersects(p1)) return true;
		if (p0.compareTo(p1) > 0) {
			var tmp = p0;
			p0 = p1;
			p1 = tmp;
		}
		var isSegUpwards = false;
		if (p1.y > p0.y) isSegUpwards = true;
		if (isSegUpwards) {
			this.li.computeIntersection(p0, p1, this.diagDown0, this.diagDown1);
		} else {
			this.li.computeIntersection(p0, p1, this.diagUp0, this.diagUp1);
		}
		if (this.li.hasIntersection()) return true;
		return false;
	}
	getClass() {
		return RectangleLineIntersector;
	}
}
