export default function addEvents(grid: any, id?: any) {
    let g = (id !== undefined ? 'grid' + id + ' ' : '');
  
    grid.on('added removed change', function(event: any, items: any) {
      let str = '';
      items.forEach(function(item: any) { str += ' (' + item.x + ',' + item.y + ' ' + item.w + 'x' + item.h + ')'; });
      console.log(g + event.type + ' ' + items.length + ' items (x,y w h):' + str );
    })
    .on('enable', function(event: any) {
      let grid = event.target;
      console.log(g + 'enable');
    })
    .on('disable', function(event: any) {
      let grid = event.target;
      console.log(g + 'disable');
    })
    .on('dragstart', function(event: any, el: any) {
      let n = el.gridstackNode;
      let x = el.getAttribute('gs-x'); // verify node (easiest) and attr are the same
      let y = el.getAttribute('gs-y');
      console.log(g + 'dragstart ' + (n.content || '') + ' pos: (' + n.x + ',' + n.y + ') = (' + x + ',' + y + ')');
    })
    .on('drag', function(event: any, el: any) {
      let n = el.gridstackNode;
      let x = el.getAttribute('gs-x'); // verify node (easiest) and attr are the same
      let y = el.getAttribute('gs-y');
      // console.log(g + 'drag ' + (n.content || '') + ' pos: (' + n.x + ',' + n.y + ') = (' + x + ',' + y + ')');
    })
    .on('dragstop', function(event: any, el: any) {
      let n = el.gridstackNode;
      let x = el.getAttribute('gs-x'); // verify node (easiest) and attr are the same
      let y = el.getAttribute('gs-y');
      console.log(g + 'dragstop ' + (n.content || '') + ' pos: (' + n.x + ',' + n.y + ') = (' + x + ',' + y + ')');
    })
    .on('dropped', function(event: any, previousNode: any, newNode: any) {
      if (previousNode) {
        console.log(g + 'dropped - Removed widget from grid:', previousNode);
      }
      if (newNode) {
        console.log(g + 'dropped - Added widget in grid:', newNode);
      }
    })
    .on('resizestart', function(event: any, el: any) {
      let n = el.gridstackNode;
      let rec = el.getBoundingClientRect();
      console.log(`${g} resizestart ${n.content || ''} size: (${n.w}x${n.h}) = (${Math.round(rec.width)}x${Math.round(rec.height)})px`);
  
    })
    .on('resize', function(event: any, el: any) {
      let n = el.gridstackNode;
      let rec = el.getBoundingClientRect();
      console.log(`${g} resize ${n.content || ''} size: (${n.w}x${n.h}) = (${Math.round(rec.width)}x${Math.round(rec.height)})px`);
    })
    .on('resizestop', function(event: any, el: any) {
      let n = el.gridstackNode;
      let rec = el.getBoundingClientRect();
      console.log(`${g} resizestop ${n.content || ''} size: (${n.w}x${n.h}) = (${Math.round(rec.width)}x${Math.round(rec.height)})px`);
    });
  }