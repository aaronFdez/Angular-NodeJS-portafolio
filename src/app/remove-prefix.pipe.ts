import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removePrefix',
  standalone: true
})
export class RemovePrefixPipe implements PipeTransform {
  transform(value: string, prefix: string): string {
    if (!value || !prefix) {
      return value;
    }
    // Quita el prefijo de la URL si está presente
    return value.startsWith(prefix) ? value.substring(prefix.length) : value;
  }
}
