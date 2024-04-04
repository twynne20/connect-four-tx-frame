import { Button, Frog, TextInput, parseEther } from 'frog'
import { abi } from './abi.ts'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { neynar, type NeynarVariables } from 'frog/middlewares'
 
type State = {
  inviteFID: string
}

export const app = new Frog<{ State: State }>({
  initialState: {
    inviteFID: 0
  }
})
  .use(
    neynar({
      apiKey: 'NEYNAR_FROG_FM',
      features: ['interactor', 'cast'],
    }),
  )
 
app.frame('/', (c) => {
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Perform a transaction
      </div>
    ),
    intents: [
      // <TextInput placeholder="FID of fren to play with..." />,
      // <Button.Transaction target="/create-game">Create New Game</Button.Transaction>,
      // <Button.Transaction target="/create-public-game">Existing Games</Button.Transaction>,
      <Button 
        action='/create-game-menu'
        value="create-game-menu"
      >
        Create New Game
      </Button>,
      // <Button 
      //   action='/join-game'
      //   value="create-game-menu"
      // >
      //   Join via GameID
      // </Button>,
      <Button 
        action='/my-games'
        value="test"
      >
        My Games
      </Button>,
    ]
  })
})


app.frame('/create-game-menu', (c) => {
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60}}>
        Connect4 by TokenTown
      </div>
    ),
    intents: [
      <Button 
        action='/'
        value='go-back'
      >
        Go Back
      </Button>,
      <Button 
        action='/create-private-game'
        value='create-private-game'
      >
        Private Game
      </Button>,
      <Button 
        action='/create-public-game'
        value='create-public-game'
      >
        Public Game
      </Button>
    ]
  })
})

const fetchFID = async (inputText: string | undefined): Promise<string> => {
  if (inputText) {
    // Perform the logic to fetch the FID based on the input text
    // Replace this with your actual implementation
    const fid = inputText;
    return fid;
  }
  return ''; // Return a default value if inputText is undefined
};

app.frame('/create-private-game', async (c) => {
  // const { deriveState, frameData } = c;
  // const state = await deriveState(async (previousState) => {
  //   previousState.inviteFID = await fetchFID(frameData?.inputText);
  //   console.log('Updated state: ', previousState)
  // });
  // const { inputText } = frameData
  // console.log('The input text is: ', inputText)
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60}}>
        Connect4 by TokenTown
      </div>
    ),
    intents: [
      <TextInput placeholder="FID of fren to play with..." />,
      <Button 
        action='/'
        value='go-back'
      >
        Go Back
      </Button>,
      <Button 
        action='/private-set-bet'
        value='private-set-bet'
      >
        Continue to Game
      </Button>
    ]
  })
})

app.frame('/create-public-game', (c) => {
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60}}>
        Connect4 by TokenTown
      </div>
    ),
    intents: [
      <TextInput placeholder="FID of fren to play with..." />,
      <Button 
        action='/'
        value='go-back'
      >
        Go Back
      </Button>,
      <Button 
        action='/public-set-bet'
        value='public-set-bet'
      >
        Continue to Game
      </Button>
    ]
  })
})

app.frame('/public-set-bet', (c) => {
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60}}>
        Connect4 by TokenTown
      </div>
    ),
    intents: [
      <TextInput placeholder="$DEGEN Bet Amount..." />,
      <Button 
        action='/'
        value='go-back'
      >
        Go Back
      </Button>,
      <Button value='public-start-game'>Start Game</Button>
    ]
  })
})

app.frame('/private-set-bet', async (c) => {
  const { deriveState, frameData } = c;
  
  const state = await deriveState(async (previousState) => {
    if (frameData?.inputText) {
      previousState.inviteFID = frameData.inputText;
    }
    console.log('Updated state:', previousState);
  });

  console.log('Saved FID: ', frameData?.inputText);

  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60}}>
        Connect4 by TokenTown
      </div>
    ),
    intents: [
      <TextInput placeholder="$DEGEN Bet Amount..." />,
      <Button 
        action='/'
        value='go-back'
      >
        Go Back
      </Button>,
      <Button value='private-start-game'>Start Game</Button>
    ]
  })
})

app.frame('/my-games', (c) => {
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60}}>
        Connect4 by TokenTown
        GameID's for 0x69..420

        Your turn for GameID:
        69, 420
      </div>
    ),
    intents: [
      <TextInput placeholder='Enter GameID for your move!' />,
      <Button 
        action='/'
        value='go-back'
      >
        Go Back
      </Button>,
      <Button value='change-wallet'>Change Wallet</Button>,
      <Button value='make-move'>Make Move</Button>
    ]
  })
})

 
app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    )
  })
})
 
 
app.transaction('/create-game', (c) => {
  const betAmount = BigInt(100 * 10 ** 18); // 100 tokens with 18 decimals

  // Contract transaction response.
  return c.contract({
    abi,
    chainId: 'eip155:84532',
    functionName: 'createGame',
    args: [betAmount, "0x00120C01C5369864a443b1e913793943d86b8Fc3", false, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
    to: '0x81De8d581Bf96c7F24D1A26c8cB4EDC130EF711D',
    value: 0n,
    attribution: false
  })

  
})


// app.transaction('/make-move', (c) => {
//   const betAmount = BigInt(100 * 10 ** 18); // 100 tokens with 18 decimals

//   // Contract transaction response.
//   return c.contract({
//     abi,
//     chainId: 'eip155:84532',
//     functionName: 'makeMove',
//     args: [_gameId, _column],
//     to: '0x81De8d581Bf96c7F24D1A26c8cB4EDC130EF711D',
//     value: 0n,
//     attribution: false
//   })
// })

devtools(app, { serveStatic })