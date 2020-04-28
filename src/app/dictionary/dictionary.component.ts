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
      this.wordDescription = 'Description not found';
      this.wordSynonyms = ['Synonyms not found'];
      this.wordExample = '';
    }
  }

   displaySearchResults(): void {
    this.matchedPhraseProperties();
  }

  findSearchedPhrase(): void {
    // tslint:disable-next-line:prefer-const
    for (let word of this.Dictionary) {
      this.comparingWord = word.word;

      // let {wordName: string} = word;
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
