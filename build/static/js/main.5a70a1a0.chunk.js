(this["webpackJsonpvote-client"]=this["webpackJsonpvote-client"]||[]).push([[0],{168:function(e,t,n){"use strict";var a=n(0),o=n.n(a),i=n(28),r=n(171),c=n(31),l=n(119);t.a=e=>{const[t,n]=Object(a.useState)("0");return o.a.createElement(i.a,{sx:{border:"2px solid gray",borderRadius:"7px 7px 7px 7px",backgroundColor:"#1F2123",padding:3,margin:3,height:"35%",width:"100%"}},o.a.createElement(c.a,{variant:"h4",gutterBottom:!0,component:"div",sx:{color:"whitesmoke"}},e.heading),o.a.createElement(c.a,{variant:"subtitle1",gutterBottom:!0,component:"div",sx:{color:"whitesmoke"}},e.subHeading),o.a.createElement("br",null),o.a.createElement(i.a,{container:!0,direction:"row",xs:12,spacing:2,alignItems:"center",justifyContent:"center"},o.a.createElement(i.a,{item:!0,sm:12,md:8,justifyItems:"center"},o.a.createElement(r.a,{id:"Query ID",label:e.idText,variant:"filled",onChange:e=>{n(e.target.value)},sx:{backgroundColor:"white"}})),o.a.createElement(i.a,{item:!0,sm:12,md:4,justifyItems:"space-between"},o.a.createElement(l.a,{sx:{padding:"10px",border:"1px solid",borderRadius:"5px",color:"whitesmoke"},onClick:()=>{Number(t)<1?alert("Ids start from 1"):e.function((Number(t)-1).toString())}},e.buttonText))))}},214:function(e,t){},302:function(e,t,n){"use strict";(function(e){var a=n(45),o=n(70),i=n(51),r=n(50),c=n(0),l=n.n(c),s=n(28),d=n(303),u=n(168),m=n(305),E=n(306),_=n(31);const p={hdPaths:[Object(a.makeCosmoshubPath)(0)],prefix:"juno"},g=async e=>await r.DirectSecp256k1HdWallet.fromMnemonic(e,p);t.a=()=>{const t=!e.argv.includes("--mainnet"),n="https://rpc.juno-1.deuslabs.fi",a="https://rpc.uni.juno.deuslabs.fi",r="term kangaroo lonely pact dove kiwi attitude swim deliver giggle resist pride similar turtle chicken sport phone foam mail wall account large settle firm",p="juno13qcfy3tlrs20430cx28w76c4fjlzsmhj9d0decyy30m5jsh70cps22vc06";let S,h;const[x,T]=Object(c.useState)(!1),[v,C]=Object(c.useState)(!1),[O,b]=Object(c.useState)(!1),[f,D]=Object(c.useState)(!1),[w,P]=Object(c.useState)(!1),[k,N]=Object(c.useState)([]),[I,j]=Object(c.useState)([]),[y,W]=Object(c.useState)([]),[B,U]=Object(c.useState)([]),[L,K]=Object(c.useState)([]);return l.a.createElement(s.a,{container:!0},l.a.createElement(d.a,{function:async e=>{T(!0),S=await g(r),h=await o.SigningCosmWasmClient.connectWithSigner(t?a:n,S,{prefix:"juno",gasPrice:i.GasPrice.fromString("0.0025ujunox")});const c=(await S.getAccounts())[0];console.log("account: "),console.log(c);const l=await h.execute(c.address,p,{create_vote_box:{deadline:{at_height:e},owner:c.address}},"auto");console.log(l),void 0===l?alert("Something went wrong with the VoteBox creation"):alert("Your txhash : "+l.transactionHash),T(!1)}}),x&&l.a.createElement(_.a,{variant:"overline",gutterBottom:!0,component:"div",sx:{color:"gray"}},"Creating the votebox..."),l.a.createElement("br",null),l.a.createElement(m.a,{function:async(e,c,l)=>{C(!0),S=await g(r),h=await o.SigningCosmWasmClient.connectWithSigner(t?a:n,S,{prefix:"juno",gasPrice:i.GasPrice.fromString("0.0025ujunox")});const s=(await S.getAccounts())[0];console.log("account: "),console.log(s);const d=await h.execute(s.address,p,{vote:{id:e,vote:c}},"auto");console.log(d),void 0===d?alert("Something went wrong"):alert("You have voted "+l),C(!1)}}),v&&l.a.createElement(_.a,{variant:"overline",gutterBottom:!0,component:"div",sx:{color:"gray"}},"Voting..."),l.a.createElement("br",null),l.a.createElement(u.a,{function:async e=>{b(!0),S=await g(r),h=await o.SigningCosmWasmClient.connectWithSigner(t?a:n,S,{prefix:"juno",gasPrice:i.GasPrice.fromString("0.0025ujunox")});const c=(await S.getAccounts())[0];console.log("account: "),console.log(c);let l=Number(e)+1;const s=await h.queryContractSmart(p,{query_vote:{id:l.toString()}});console.log(s),alert("id : "+s.id+"\nowner : "+s.owner+"\nyes count : "+s.yes_count+"\nno count : "+s.no_count+"\ndeadline block : "+s.deadline.at_height),b(!1)},heading:"Query VoteBox",subHeading:"Enter the id of the box",idText:"VoteBox ID",buttonText:"Query VoteBox"}),O&&l.a.createElement(_.a,{variant:"overline",gutterBottom:!0,component:"div",sx:{color:"gray"}},"Getting results..."),l.a.createElement("br",null),l.a.createElement(u.a,{function:async e=>{D(!0),S=await g(r),h=await o.SigningCosmWasmClient.connectWithSigner(t?a:n,S,{prefix:"juno",gasPrice:i.GasPrice.fromString("0.0025ujunox")});const c=(await S.getAccounts())[0];console.log("account: "),console.log(c);const l=await h.queryContractSmart(p,{get_list:{start_after:Number(e)}});for(let t=0;t<10;t++)N(e=>[...e,l.voteList[t].id]),j(e=>[...e,l.voteList[t].yes_count]),W(e=>[...e,l.voteList[t].no_count]),U(e=>[...e,l.voteList[t].owner]),K(e=>[...e,l.voteList[t].deadline.at_height]);D(!1),P(!0)},heading:"Query VoteBox List",subHeading:"Enter the id that the list of VoteBoxes will start from",idText:"Starting VoteBox ID",buttonText:"Query VoteBox List"}),f&&l.a.createElement(_.a,{variant:"overline",gutterBottom:!0,component:"div",sx:{color:"gray"}},"Getting the list of results..."),k.map((e,t)=>l.a.createElement(E.a,{key:t,id:k[t],yesCount:I[t],noCount:y[t],owner:B[t],deadline:L[t]})))}}).call(this,n(20))},303:function(e,t,n){"use strict";var a=n(0),o=n.n(a),i=n(28),r=n(171),c=n(31),l=n(119);t.a=e=>{const[t,n]=Object(a.useState)("0");return o.a.createElement(i.a,{sx:{border:"2px solid gray",borderRadius:"7px 7px 7px 7px",backgroundColor:"#1F2123",padding:3,margin:3,height:"35%",width:"100%"}},o.a.createElement(c.a,{variant:"h4",gutterBottom:!0,component:"div",sx:{color:"whitesmoke"}},"Create Your VoteBox"),o.a.createElement(c.a,{variant:"subtitle1",gutterBottom:!0,component:"div",sx:{color:"whitesmoke"}},"Enter the deadline height for the votebox and click create button"),o.a.createElement("br",null),o.a.createElement(i.a,{container:!0,direction:"row",xs:12,spacing:2,alignItems:"center",justifyContent:"center"},o.a.createElement(i.a,{item:!0,sm:12,md:8,justifyItems:"center"},o.a.createElement(r.a,{id:"deadline-height",label:"Deadline Height",variant:"filled",onChange:e=>{n(e.target.value)},sx:{backgroundColor:"white"}})),o.a.createElement(i.a,{item:!0,sm:12,md:4},o.a.createElement(l.a,{sx:{padding:"10px",border:"1px solid",borderRadius:"5px",color:"whitesmoke"},onClick:()=>{e.function(Number(t))}},"Create VoteBox"))))}},305:function(e,t,n){"use strict";var a=n(0),o=n.n(a),i=n(28),r=n(171),c=n(31),l=n(119);t.a=e=>{const[t,n]=Object(a.useState)("0"),[s,d]=Object(a.useState)(!1),[u,m]=Object(a.useState)(!1);return o.a.createElement(i.a,{sx:{border:"2px solid gray",borderRadius:"7px 7px 7px 7px",backgroundColor:"#1F2123",padding:3,margin:3,height:"35%",width:"100%"}},o.a.createElement(c.a,{variant:"h4",gutterBottom:!0,component:"div",sx:{color:"whitesmoke"}},"Vote"),o.a.createElement(c.a,{variant:"subtitle1",gutterBottom:!0,component:"div",sx:{color:"whitesmoke"}},"Enter the id of the VoteBox and then enter your choice"),o.a.createElement("br",null),o.a.createElement(i.a,{direction:"row",justifyContent:"space-between",sx:{width:"100%"}},o.a.createElement(i.a,{container:!0,direction:"row",xs:12,spacing:2,alignItems:"center",justifyContent:"center"},o.a.createElement(i.a,{item:!0,sm:12,md:8,justifyItems:"center"},o.a.createElement(r.a,{id:"votebox-id",label:"VoteBox ID",variant:"filled",onChange:e=>{n(e.target.value)},sx:{backgroundColor:"white"}})),o.a.createElement(i.a,{item:!0,sm:12,md:4,justifyItems:"space-between"},o.a.createElement(l.a,{sx:{border:"1px solid",borderRadius:"5px",color:"whitesmoke"},onClick:()=>{m(!1),e.function(t,u,"NO")}},"No"),o.a.createElement(l.a,{sx:{border:"1px solid",borderRadius:"5px",color:"whitesmoke"},onClick:()=>{d(!0),e.function(t,s,"YES")}},"Yes")))))}},306:function(e,t,n){"use strict";var a=n(0),o=n.n(a),i=n(28),r=n(31);t.a=e=>o.a.createElement(i.a,{container:!0,direction:"column",justifyContent:"center",sx:{border:"2px solid gray",borderRadius:"7px 7px 7px 7px",backgroundColor:"#1F2123",padding:3,margin:3,height:"35%",width:"100%"}},o.a.createElement(i.a,{container:!0,direction:"row",xs:12,spacing:2,alignItems:"center",justifyContent:"center"},o.a.createElement(r.a,{variant:"h5",gutterBottom:!0,component:"div",sx:{color:"white"}},"ID: ",e.id),o.a.createElement(r.a,{variant:"h5",gutterBottom:!0,component:"div",pl:2,sx:{color:"white"}},"YES: ",e.yesCount),o.a.createElement(r.a,{variant:"h5",gutterBottom:!0,component:"div",pl:2,sx:{color:"white"}},"NO: ",e.noCount),o.a.createElement(r.a,{variant:"h5",gutterBottom:!0,component:"div",pl:2,sx:{color:"white"}},"DEADLINE: ",e.deadline)),o.a.createElement("hr",null),o.a.createElement("br",null),o.a.createElement(r.a,{variant:"h5",gutterBottom:!0,component:"div",sx:{color:"white"}},"OWNER: ",o.a.createElement("br",null),e.owner))},307:function(e,t,n){e.exports=n.p+"static/media/logo.d1c725d9.png"},327:function(e,t,n){e.exports=n(616)},340:function(e,t){},355:function(e,t){},357:function(e,t){},367:function(e,t){},369:function(e,t){},417:function(e,t){},418:function(e,t){},423:function(e,t){},425:function(e,t){},432:function(e,t){},451:function(e,t){},470:function(e,t){},615:function(e,t,n){},616:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(59),r=n.n(i),c=n(312),l=n(21);var s=n(70),d=n(23);const u={chainId:"juno-1",chainName:"Juno",addressPrefix:"juno",rpcUrl:"https://rpc.juno-1.deuslabs.fi",feeToken:"ujuno",stakingToken:"ujuno",coinMap:{ujuno:{denom:"JUNO",fractionalDigits:6}},gasPrice:.025,fees:{upload:15e5,init:5e5,exec:2e5}},m={chainId:"uni-2",chainName:"Uni",addressPrefix:"juno",rpcUrl:"https://rpc.uni.juno.deuslabs.fi",httpUrl:"https://lcd.uni.juno.deuslabs.fi",faucetUrl:"https://faucet.uni.juno.deuslabs.fi",feeToken:"ujunox",stakingToken:"ujunox",coinMap:{ujunox:{denom:"JUNOX",fractionalDigits:6}},gasPrice:.025,fees:{upload:15e5,init:5e5,exec:2e5}},E=e=>"mainnet"===e?u:m;var _=n(117);async function p(e){var t;const n=window;if(!n.getOfflineSigner)throw new Error("Keplr extension is not available");await n.keplr.experimentalSuggestChain((e=>({chainId:e.chainId,chainName:e.chainName,rpc:e.rpcUrl,rest:e.httpUrl,bech32Config:{bech32PrefixAccAddr:""+e.addressPrefix,bech32PrefixAccPub:e.addressPrefix+"pub",bech32PrefixValAddr:e.addressPrefix+"valoper",bech32PrefixValPub:e.addressPrefix+"valoperpub",bech32PrefixConsAddr:e.addressPrefix+"valcons",bech32PrefixConsPub:e.addressPrefix+"valconspub"},currencies:[{coinDenom:e.coinMap[e.feeToken].denom,coinMinimalDenom:e.feeToken,coinDecimals:e.coinMap[e.feeToken].fractionalDigits},{coinDenom:e.coinMap[e.stakingToken].denom,coinMinimalDenom:e.stakingToken,coinDecimals:e.coinMap[e.stakingToken].fractionalDigits}],feeCurrencies:[{coinDenom:e.coinMap[e.feeToken].denom,coinMinimalDenom:e.feeToken,coinDecimals:e.coinMap[e.feeToken].fractionalDigits}],stakeCurrency:{coinDenom:e.coinMap[e.stakingToken].denom,coinMinimalDenom:e.stakingToken,coinDecimals:e.coinMap[e.stakingToken].fractionalDigits},gasPriceStep:{low:e.gasPrice/2,average:e.gasPrice,high:2*e.gasPrice},bip44:{coinType:118},coinType:118}))(e)),await n.keplr.enable(e.chainId);const a=await n.getOfflineSignerAuto(e.chainId);return a.signAmino=null!==(t=a.signAmino)&&void 0!==t?t:a.sign,Promise.resolve(a)}function g(){throw new Error("Not yet initialized")}const S={initialized:!1,init:g,clear:g,address:"",name:"",balance:[],refreshBalance:g,getClient:g,getSigner:g,updateSigner:g,network:"",setNetwork:g},h=a.createContext(S),x=()=>a.useContext(h);function T(e){let{children:t,network:n,setNetwork:o}=e;const[i,r]=Object(a.useState)(),[c,l]=Object(a.useState)(),u=E(n),m={...S,init:r,network:n,setNetwork:o},[_,p]=Object(a.useState)(m),g=()=>{p({...m}),l(void 0),r(void 0)};async function x(e,t){if(c){t.length=0;for(const n in u.coinMap){const a=await c.getBalance(e,n);a&&t.push(a)}p({..._,balance:t})}}const T=e=>{r(e)};return Object(a.useEffect)(()=>{i&&async function(){try{const e=await async function(e,t){const n=E(t);return s.SigningCosmWasmClient.connectWithSigner(n.rpcUrl,e,{gasPrice:{amount:d.Decimal.fromUserInput("0.0025",100),denom:n.feeToken}})}(i,n);l(e)}catch(e){console.log(e)}}()},[i]),Object(a.useEffect)(()=>{if(!i||!c)return;const e=[];!async function(){const t=(await i.getAccounts())[0].address,a=window,r=await a.keplr.getKey(u.chainId);await x(t,e),localStorage.setItem("wallet_address",t),p({initialized:!0,init:()=>{},clear:g,address:t,name:r.name||"",balance:e,refreshBalance:x.bind(null,t,e),getClient:()=>c,getSigner:()=>i,updateSigner:T,network:n,setNetwork:o})}()},[c]),Object(a.useEffect)(()=>{p({..._,network:n})},[n]),a.createElement(h.Provider,{value:_},t)}const v={isDarkTheme:!0,setIsDarkTheme:e=>{}},C=Object(a.createContext)(v);function O(e){let{children:t,isDarkTheme:n,setIsDarkTheme:a}=e,i={...v,isDarkTheme:n,setIsDarkTheme:a};return o.a.createElement(C.Provider,{value:i},t)}var b=n(302);parseInt(Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_TESTNET_CW20_MERKLE_DROP_CODE_ID,10),parseInt(Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_TESTNET_CW20_BASE_CODE_ID,10),parseInt(Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_TESTNET_CW20_BONDING_CODE_ID,10),parseInt(Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_TESTNET_CW20_STAKING_CODE_ID,10),parseInt(Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_TESTNET_CW1_SUBKEYS_CODE_ID,10),parseInt(Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_MAINNET_CW20_MERKLE_DROP_CODE_ID,10),parseInt(Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_MAINNET_CW20_BASE_CODE_ID,10),parseInt(Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_MAINNET_CW20_BONDING_CODE_ID,10),parseInt(Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_MAINNET_CW20_STAKING_CODE_ID,10),parseInt(Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_MAINNET_CW1_SUBKEYS_CODE_ID,10);const f=Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_NETWORK;Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_S3_ENDPOINT,Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_S3_REGION,Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_S3_KEY,Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_S3_SECRET,Object({NODE_ENV:"production",PUBLIC_URL:"/vote-client",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NEXT_PUBLIC_S3_BUCKET;var D=n(672),w=n(666),P=n(28),k=n(31),N=n(307),I=n.n(N);var j=()=>o.a.createElement(P.a,{container:!0,sm:12,justifySelf:"center",justifyItems:"center"},o.a.createElement(P.a,{item:!0,xs:12,sx:{justifyContent:"center !important",display:"inline-grid"}},o.a.createElement("img",{src:I.a,alt:"logo",width:400,height:400,style:{border:"3px solid gray",borderRadius:"7px 7px 7px 7px"}})),o.a.createElement(P.a,null,o.a.createElement(k.a,{variant:"h3",sx:{color:"whitesmoke",paddingTop:"30px",textAlign:"center"}},"Welcome to VoteBox!"),o.a.createElement(k.a,{variant:"h5",sx:{color:"whitesmoke",textAlign:"center"},marginTop:5},"With VoteBox, you can create your own vote boxes and people from all around the world can participate in the voting process with total anonymity."),o.a.createElement(k.a,{variant:"h5",sx:{color:"whitesmoke",textAlign:"center"},marginTop:5},"Let's start with your first VoteBox!"))),y=n(678),W=n(671),B=n(679),U=n(673),L=n(669),K=n(675),R=n(676),A=n(311),H=n.n(A),V=n(674),M=n(677),X=n(309),G=n.n(X),z=n(308),F=n.n(z),Y=n(310),J=n.n(Y);var Q=e=>e.slice(0,8).concat(".....")+e.substring(36);function q(){const e=x(),t=function(){const{clear:e,init:t,initialized:n,network:o}=x(),[i,r]=Object(a.useState)(!1),c=E(o);return Object(a.useEffect)(()=>{n&&r(!1)},[n]),{connect:function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];r(!0),p(c).then(n=>{t(n),e&&r(!1)}).catch(e=>{r(!1),_.b.error(e.message)})},disconnect:()=>{localStorage.clear(),e()},initializing:i}}(),[n,i]=o.a.useState(!1),r=()=>{i(!n)},c=e.initialized?e.name||Q(e.address):"Connect Wallet";Object(a.useEffect)(()=>{window.addEventListener("keplr_keystorechange",()=>{t.connect(!0)})},[]);const l=Object(a.useCallback)(()=>t.connect(),[t]),s=o.a.createElement(D.a,null,o.a.createElement(V.a,null),o.a.createElement(U.a,null,o.a.createElement(L.a,{button:!0,onClick:()=>{e.initialized?t.disconnect():l()}},o.a.createElement(K.a,null,o.a.createElement(F.a,{sx:{color:"white"}})),t.initializing?o.a.createElement(R.a,{primary:"Connect Wallet"}):o.a.createElement(R.a,{primary:c})),o.a.createElement(M.a,{href:"/",underline:"none",sx:{color:"white"}},o.a.createElement(L.a,null,o.a.createElement(K.a,null,o.a.createElement(G.a,{sx:{color:"white"}})),o.a.createElement(R.a,{primary:"Home"}))),o.a.createElement(M.a,{href:"/vote",underline:"none",sx:{color:"white"}},o.a.createElement(L.a,null,o.a.createElement(K.a,null,o.a.createElement(J.a,{sx:{color:"white"}})),o.a.createElement(R.a,{primary:"Vote"})))));return o.a.createElement(D.a,{sx:{display:"flex",backgroundColor:"#1F2123 !important"}},o.a.createElement(w.a,null),o.a.createElement(y.a,{position:"fixed",sx:{width:{sm:"calc(100% - 240px)"},ml:{sm:"240px"}}},o.a.createElement(V.a,{sx:{backgroundColor:"#1F2123"}},o.a.createElement(B.a,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:r,sx:{mr:2,display:{sm:"none"}}},o.a.createElement(H.a,null)),o.a.createElement(k.a,{variant:"h5",noWrap:!0,component:"div",sx:{textAlign:"center",width:"100%"}},"VoteBox"))),o.a.createElement(D.a,{component:"nav",sx:{width:{sm:240},flexShrink:{sm:0}},"aria-label":"mailbox folders"},o.a.createElement(W.a,{variant:"temporary",open:n,onClose:r,ModalProps:{keepMounted:!0},PaperProps:{sx:{backgroundColor:"#1F2123",color:"white"}},sx:{display:{xs:"block",sm:"none"},"& .MuiDrawer-paper":{boxSizing:"border-box",width:240}}},s),o.a.createElement(W.a,{PaperProps:{sx:{backgroundColor:"#1F2123",color:"white"}},variant:"permanent",sx:{display:{xs:"none",sm:"block"},"& .MuiDrawer-paper":{boxSizing:"border-box",width:240}},open:!0},s)))}function Z(){const[e,t]=Object(a.useState)(!0),[n,i]=Object(a.useState)(f);return o.a.createElement(O,{isDarkTheme:e,setIsDarkTheme:t},o.a.createElement(T,{network:n,setNetwork:i},o.a.createElement(D.a,{sx:{display:"flex",backgroundColor:"#1F2123 !important"}},o.a.createElement(q,null),o.a.createElement(w.a,null),o.a.createElement(D.a,{component:"main",sx:{flexGrow:1,p:3,width:{sm:"calc(100% - 240px)"}}},o.a.createElement(c.a,{basename:"/vote-client"},o.a.createElement(D.a,{marginTop:10},o.a.createElement(_.a,{position:"top-right"}),o.a.createElement(l.c,null,o.a.createElement(l.a,{exact:!0,path:"/",component:j}),o.a.createElement(l.a,{exact:!0,path:"/vote",component:b.a}))))))))}n(615);r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(Z,null)),document.getElementById("root"))}},[[327,1,2]]]);
//# sourceMappingURL=main.5a70a1a0.chunk.js.map