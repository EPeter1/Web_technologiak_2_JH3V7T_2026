import { Achievement } from './achievement';
import { User } from './user';

export interface UserAchievement {
    _id?: string;
    achievementId: Achievement;
    userId: User;
    platform: 'PC' | 'Playstation' | 'Xbox' | 'Switch';
    unlockedAt?: Date;
}
