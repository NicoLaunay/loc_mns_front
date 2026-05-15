import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
    slugify(string: String): String {
        return string
            .trim()
            .toLowerCase()
            .normalize("NFD") //sépare les caractères accentués en caractères + accent
            .replace(/[\u0300-\u036f]/g, "") // supprime les caractères "accents"
            .replaceAll(" ", "-")
    }
}