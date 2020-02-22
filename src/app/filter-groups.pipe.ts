import { Pipe, PipeTransform } from '@angular/core';
// tslint:disable
@Pipe({
  name: 'filterGroups'
})
export class FilterGroupsPipe implements PipeTransform {
  transform(groups: any): any {
    let fromGroup: any;
    return groups.filter((group) => {
      fromGroup = group.fields[0].functionality && group.fields[0].functionality.type === 'Replicate'  ? group.fields[0].functionality.fromGroup : fromGroup;
      return group.groupId !== fromGroup;
    });
  }
}
