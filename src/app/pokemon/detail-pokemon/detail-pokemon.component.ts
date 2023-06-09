import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit{
  pokemonList:Pokemon[];
  pokemon:Pokemon|undefined;

  constructor(
    private route:ActivatedRoute,//Acceder a la route courante
    private router:Router,// router pour acceder aux router d'angular
    private pokemonService:PokemonService
    ){}
  ngOnInit(): void {
    const pokemonId:number=+this.route.snapshot.paramMap.get('id')!; //On recupere le parametre id de la barre de nav de la route courante
    if(pokemonId){
      //Si il y a une valeur trouvé
      this.pokemonService.getPokemonById(+pokemonId).subscribe(
        pokemon=>this.pokemon=pokemon
      );//On attribut a pokemon le pokemon a l'Id trouvé avec le service
    }
  }

  deletePokemon(pokemon:Pokemon){
    this.pokemonService.deletePokemonById(pokemon.id).subscribe(
      ()=>this.goToPokemonList()
    );
  }
  goToPokemonList(){
    this.router.navigate(['/pokemons']);
  }

  goToEditPokemon(pokemon:Pokemon){
    this.router.navigate(['/edit/pokemon',pokemon.id]);
  }
}
