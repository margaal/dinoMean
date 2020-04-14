export class Dinosaure {
    friends: string[];
    id: string;
    name: string;
    family: string;
    color: string;
    presentation: string;
    food: string;
    weight: number;
    dob: number;
    isCurrentDinoFriend:boolean;
}

export class DinoLoginViewModel{
    name: string;
    password: string;
}

export class DinoRegistrationViewModel{
    password: string;
    family: string;
    presentation: string;
}

export class DinoResponse{
    friends: string[];
    _id: string;
    __v: number;
    name: string;
    family: string;
    color: string;
    presentation: string;
    food: string;
    weight: number;
    dob: number;

    static convertToDinosaureModel(dinoResponse) :  Dinosaure{
        var dino = new Dinosaure();
        dino.id = dinoResponse._id;
        dino.name = dinoResponse.name;
        dino.family = dinoResponse.family;
        dino.presentation = dinoResponse.presentation;
        dino.food = dinoResponse.food;
        dino.color = dinoResponse.color;
        dino.dob = dinoResponse.dob;
        dino.friends = dinoResponse.friends;
        dino.weight = dinoResponse.weight;
        
        return dino;
    }
}
