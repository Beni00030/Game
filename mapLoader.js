

const tmx = require('tmx-parser');

async function loadMap(){
    const map = await new Promise((resolve, reject) =>{
        tmx.parseFile("./map/Map.tmx", (err,loadedMap) => {
            if(err) return reject(err);
            resolve(loadedMap);  
        });
    });
    
    var map2D = [];
    var layer = map.layers[0];
    var tiles = layer.tiles;
    for (let row = 0; row < map.height; row++) {
        var tileRow = [];
        for (let col = 0; col < map.width; col++) {
            var tile = tiles[row *map.height + col]
            tileRow.push({id:tile.id,gid:tile.gid});
            
        }
        map2D.push(tileRow);

    }
    return map2D;
}
module.exports = loadMap;