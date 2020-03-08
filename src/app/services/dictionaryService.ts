import { Injectable } from '@angular/core';
import { DICTIONARY } from '../data/dictionary-data';

@Injectable({
    providedIn: 'root'
})

export class DictionaryService {
    getEntireDictionaryAsync(){
        return Promise.resolve(DICTIONARY);
    }

    getEntireDictionary(){
        return DICTIONARY;
    }
}
