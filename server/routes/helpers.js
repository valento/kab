export let format_game = function (data,lng=0){
  return data.map((game,index) => {
    return Object.assign({}, game, {
      que: game.que.includes('#')? game.que.split('#')[lng] : game.que,
      ans: game.ans.includes('#')? game.ans.split('#')[lng] : game.ans,
      si_unit: game.si_unit.includes('#')? game.si_unit.split('#')[lng] : game.si_unit,
      options: game.options.split(','),
      points: game.points.split('#')
    })
  })
}
