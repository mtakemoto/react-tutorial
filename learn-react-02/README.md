## Part 2

From [https://reactjs.org/tutorial/tutorial.html#completing-the-game]

### Refactoring (lifting state up)

Why?
- Difficult to understand
- Hard to refactor
- Suceptible to bugs
- Follows SOLID (single responsibility)
- Single source of truth (by passing state down)

### Immutability


**With Mutation**
```
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}
```

**Without Mutation**
```
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax proposal, you can write:
// var newPlayer = {...player, score: 2};
```

Why?
- Change detection by the React engine becomes easier.  New object = new hashcode = rerender.  Modifying an old object is not as reliable
- Time travel.  Allows for undoing of moves by shifting back to previous object
- Simplicity: pure functions