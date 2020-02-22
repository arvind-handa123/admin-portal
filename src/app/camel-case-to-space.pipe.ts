import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToSpace'
})
export class CamelCaseToSpacePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    value = value.replace('_', ' ')
    return value.replace(/([a-z0-9])([A-Z])/g, '$1 $2') ;
  }

}
