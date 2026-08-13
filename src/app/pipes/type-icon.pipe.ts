import { Pipe, PipeTransform } from '@angular/core';
import { iconForTypeName } from '../models/type.model';

@Pipe({ name: 'typeIcon' })
export class TypeIconPipe implements PipeTransform {
    transform(typeName?: string | null): string {
        return iconForTypeName(typeName);
    }
}