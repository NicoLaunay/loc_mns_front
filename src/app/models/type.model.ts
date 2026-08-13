export interface ApiType {
    id: number,
    name: string,
}

export interface Type extends ApiType {
    icon: string
}


// SEULE source de vérité pour les icônes de type.
// Pour associer une icône à un type, ajouter une entrée ici.
// Noms à choisir sur https://fonts.google.com/icons (police "Material Icons").
export const TYPE_ICONS: Record<string, string> = {
    'tour': 'computer',
    'pc portable': 'laptop',
    'ecran': 'desktop_windows',
    'gpu': 'memory',
    'videoprojecteur': 'audio_video_receiver',
    'casque vr': 'head_mounted_device',
    'clavier': 'keyboard',
    'souris': 'mouse',
    'station d\'accueil': 'power',
    'casque audio': 'headphones',
}
// Icône par défaut si type inconnu
export const DEFAULT_TYPE_ICON = 'devices'


function normalizeName(name: string): string {
    return name.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

export function iconForTypeName(name?: string | null): string {
    if (!name) return DEFAULT_TYPE_ICON
    return TYPE_ICONS[normalizeName(name)] ?? DEFAULT_TYPE_ICON
}

export function mapTypeWithIcon(apiType: ApiType): Type {
    return { ...apiType, icon: iconForTypeName(apiType.name) }
}

export class TypeBuilder implements ApiType {
    id: number = 0;
    name: string = 'unnamed type';
    icon: string = DEFAULT_TYPE_ICON;

    /**
     * builds and returns a TypeBuilder Object
     */
    public build(): Type {
        return {
            id: this.id,
            name: this.name,
            icon: this.icon
        }
    }

    /**
     * sets id and returns the TypeBuilder object
     */
    public withId(id: number) {
        this.id = id
        return this
    }

    /**
     * sets name and returns the TypeBuilder object
     */
    public withName(name: string) {
        this.name = name
        return this
    }

    /**
     * sets name and returns the TypeBuilder object
     */
    public withIcon(icon: string) {
        this.icon = icon
        return this
    }

}