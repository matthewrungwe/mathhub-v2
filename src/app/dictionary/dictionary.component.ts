import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { iDictionary } from '../interfaces/dictionary-interface';
import { DictionaryService } from '../services/dictionaryService';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
  providers: [
    Title,
    DictionaryService
  ]
})

export class DictionaryComponent implements OnInit {
  Dictionary: iDictionary[];
  sortedDictionary: iDictionary[];
  searchPhrase: string;
  cachedSearchPhrase: string;

  comparingWord: string;
  wordFound: boolean = false;
  matchedPhraseObject: iDictionary;
  wordName: string;
  wordDescription: string;
  wordSynonyms: string[];
  wordExample: string;


  // The constructor function
  // called soon after page load and assigns important members
  constructor(private _titleService: Title, private _dictionaryService: DictionaryService) {
    this._titleService.setTitle('Math WordHub');
    this.getDictionary();
  }

  // Getting all words from the Dictionary Data
  getDictionary() {
    this.Dictionary = this._dictionaryService.getEntireDictionary();

    this.sortDictionary();
  }

  // sortDictionary method: to sort all the words into alphabetic order
  sortDictionary(): void {
    // An array of all unsorted words
    const unsortedWords: string[] = [];
    // assigning unsortedWords by iterating through entire Dictionary
    for (const word of this.Dictionary) {
      unsortedWords.push(word.word);
    }

    // Sorting all unsorted words using sort()
    // Assigning sortedWords objects to sortedArray
    const sortedWords: string[] = unsortedWords.sort();
    const sortedArray: iDictionary[] = [];

    for (const sortedWord of sortedWords) {
      for (const word of this.Dictionary) {
        if (word.word === sortedWord) {
          sortedArray.push(word);
        }
      }
    }

    // Assigning sortedArray to sortedDictionary array
    if (sortedArray) {
      this.sortedDictionary = sortedArray;
    }
  }

  matchedPhraseProperties(): void {
    console.log(this.wordFound);
    if (this.wordFound) {
      this.wordName = this.matchedPhraseObject.word;
      this.wordDescription = this.matchedPhraseObject.description;
      this.wordSynonyms = this.matchedPhraseObject.synonyms;
      this.wordExample = this.matchedPhraseObject.example;
    } else {
      this.wordName = 'Word or Phrase not found';
      this.wordDescription = '';
      this.wordSynonyms = [''];
      this.wordExample = '';
    }
  }

   displaySearchResults(): void {
    this.matchedPhraseProperties();
  }

  findSearchedPhrase(): void {
    for (const word of this.sortedDictionary) {
      this.comparingWord = word.word;

      if (this.comparingWord === this.cachedSearchPhrase) {
        this.wordFound = true;
        this.matchedPhraseObject = word;
      }
    }

    console.log(this.wordFound);
    this.displaySearchResults();
  }

  // When the button is clicked, buttonClicked is set to true
  buttonOnCLick() {
    this.cachedSearchPhrase = this.searchPhrase;

    this.findSearchedPhrase();
  }

  // called when items in the search list are clicked
  listItemSearch(listItemWord: string): void {
    this.cachedSearchPhrase = listItemWord;

    this.findSearchedPhrase();
  }

  ngOnInit() {
  }

}
