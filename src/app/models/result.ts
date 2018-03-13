import { User, Shot } from './index';

export class Result {
	id: number;
	user: User;
	shot: Shot;
	hit: boolean;
	impact: number;
};