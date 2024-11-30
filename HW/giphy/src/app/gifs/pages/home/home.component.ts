import {
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { Subscription } from "rxjs";
import { CardListComponent } from "../../components/card-list/card-list.component";
import { SearchBoxComponent } from "../../components/search-box/search-box.component";
import { Gif } from "../../interfaces/gifs.interfaces";
import { GifsService } from "../../services/gifs.service";

@Component({
    selector: "gifs-home-page",
    standalone: true,
    imports: [SearchBoxComponent, CardListComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, OnDestroy{
    constructor(private _gifsService: GifsService) {}

    trendingSubscription: Subscription | undefined;
    randomSubscription: Subscription | undefined;
    trendingGifs: Gif[] = [];
    randomGif: Gif[] = [];

    trendingIndex: number = 0;
    trendingLimit: number = 5;


    get gifs(): Gif[] {
        return this._gifsService.gifList;
    }

    ngOnInit(): void {

      this.trendingSubscription = this._gifsService.getTrending$(this.trendingIndex, this.trendingLimit).subscribe({
        next: (res) => {
          this.trendingGifs = res.data;
        },
        error: (error) => {
          console.log(error);
        },
      });


      this.randomSubscription = this._gifsService.getRandomGif$().subscribe({
        next: (res) => {
          this.randomGif.push(res.data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }

    loadNextTrending() {
        this.trendingIndex += this.trendingLimit;
        console.log(this.trendingIndex);
        this.trendingSubscription?.unsubscribe();
        this.trendingSubscription = this._gifsService.getTrending$(this.trendingIndex, this.trendingLimit).subscribe({
            next: (res) => {
                this.trendingGifs = res.data;
                console.log(res);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    loadNextRandom() {
        this.randomSubscription?.unsubscribe();
        this.randomSubscription = this._gifsService.getRandomGif$().subscribe({
            next: (res) => {
                this.randomGif.pop();
                this.randomGif.push(res.data);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    ngOnDestroy(): void {
        this.trendingSubscription?.unsubscribe();
        this.randomSubscription?.unsubscribe();
    }
}
