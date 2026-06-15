export interface ApiType {
    id: number,
    name: string,
}

export interface Type extends ApiType {
    icon: string
}

const typeIcons: Record<string, string> = {
    'default': "",
    'Tour': "",
    'PC portable': "laptop_chromebook",
    'Ecran': "",
    'GPU': "",
  }

export function mapTypeWithIcon(apiType: ApiType): Type {
    return {
        id: apiType.id,
        name: apiType.name,
        icon: typeIcons[apiType.name] ?? typeIcons['default']
    }
}