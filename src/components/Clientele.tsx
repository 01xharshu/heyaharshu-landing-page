"use client";

import React, { useEffect, useState } from "react";

const clients = [
  { name: "जोश Talks", subs: "11M+ Subscribers", img: "https://yt3.googleusercontent.com/ytc/AIdro_k93aReFkSxAcSOVQ3Hd1_V8N6gIUdwJx0DaNs3btm4GA=s160-c-k-c0x00ffffff-no-rj" },
  { name: "Prakhar ke Pravachan", subs: "2.6M+ Subscribers", img: "https://yt3.googleusercontent.com/hwSmxY9VTk182w_IaiZb_tanNCFIaZXlePToJum6d1_ajGChKUIynvhXBwyo4Au23-2NfNLObw=s160-c-k-c0x00ffffff-no-rj" },
  { name: "Bekifaayati", subs: "2M+ Subscribers", img: "https://yt3.googleusercontent.com/ytc/AIdro_nfBanZ__meir9rmgZsYi8Tr1PzS6oybZ8vIb1YEVV_GA=s176-c-k-c0x00ffffff-no-rj-mo" },
  { name: "Ishan Sharma", subs: "2M+ Subscribers", img: "https://yt3.ggpht.com/XfVYXUxqtn3KYNa47anz9Uu7wC7n2KnxMJuEA2VW4qNdTQ0HqfUfV0oRL_7CbHw5Fbw1dcCA=s176-c-k-c0x00ffffff-no-rj-mo" },
  { name: "Umer Qureshi", subs: "2M+ Subscribers", img: "https://yt3.googleusercontent.com/phIMrcYPFqBMqy5wyFrktKynkPpOeP5xXOo_G2gwfAVzrHMEG6mLtu0lkVJx09Fa--CkfoC5fQ=s160-c-k-c0x00ffffff-no-rj" },
  { name: "Food Pharmer", subs: "2M+ Subscribers", img: "https://yt3.ggpht.com/xbLyEjIu4jmexTH9GdkW2Mml-XbDldX2FyOrsUFpYwiVlRAuwGCanJLhdjfs7CNYjVZXWSiEuA=s176-c-k-c0x00ffffff-no-rj-mo" },
  { name: "Aayushman Pandita", subs: "1M+ Subscribers", img: "https://yt3.googleusercontent.com/N3N8Aq44K8oOphU8K4ZnWamHYZuyiXUa8wXuO5QU-K4r2txR1Q3NlD0zVlbCAk3IhAGVT8NjFGI=s160-c-k-c0x00ffffff-no-rj" },
  { name: "Hypertroph", subs: "500K+ Subscribers", img: "https://yt3.ggpht.com/ulOYZt0W3V_3YktDtGNRw3vC4aiN87QhYDxZBwuLhtfJC5yupnH1mleNI7au9Wm6fTgN8tSS1A=s176-c-k-c0x00ffffff-no-rj-mo" },
  { name: "Trading with Sidhant", subs: "500K+ Subscribers", img: "https://yt3.ggpht.com/Ui_4TVTiJPWoC2c7NMPcdiL6mCHdmddw_wZBprsJWB6kA3buUIK-3xyojhG5pslE7rG3CMkfoQ=s176-c-k-c0x00ffffff-no-rj-mo" },
  { name: "Aaditya Iyengar", subs: "450K+ Subscribers", img: "https://yt3.googleusercontent.com/VjEDkL6UnO0qtUgBJ7gq5HKT5opMqryDuKAfmVH-oSh8NNM53_0qmh7bS06j4rFHDYkvO-Flhw=s160-c-k-c0x00ffffff-no-rj" },
  { name: "Alankar Gupta", subs: "150K+ Subscribers", img: "https://yt3.ggpht.com/7wRw8XfPoDGpFM8T4i9_gBPzCcmVsHZbxw4BI3urRVo59encaIlWKj4eZSv0ZmlOpr7q62hg-Q=s176-c-k-c0x00ffffff-no-rj-mo" },
  { name: "Justin Moore", subs: "50K+ Subscribers", img: "https://yt3.ggpht.com/ZKSXqSoul2XOMXmQ74qkdzqViOWpLNAWJMAz17vX1gk5cuoRN2HSUXXYLYEZJG9KUHfTjnKF=s176-c-k-c0x00ffffff-no-rj-mo" },
  { name: "Aryan Singh", subs: "50K+ Subscribers", img: "https://yt3.ggpht.com/a0cqrewDvGudRK5UGPtZ1P5_jQNVFoWQbItyBm4Md9Yvr441JfvpOteTFXn86RJIjWbrl-3irA=s176-c-k-c0x00ffffff-no-rj-mo" },
  { name: "Vendy Steinberga", subs: "30K+ Subscribers", img: "https://yt3.ggpht.com/9YBP5dHp_jCpHSXAVBUYwr6WfqzOZOWnIcBpC4bChjyYehJeH-dI0j5GmQ-Mn6T9fmpUK3kh1Oc=s176-c-k-c0x00ffffff-no-rj-mo" },
  { name: "Akshat Tongia", subs: "30K+ Subscribers", img: "https://yt3.ggpht.com/MZqHzUEWSR4pClo5NfBcU4_7HJ16AdSb6PddRADiudmjDh9S1dvMtRYKeP9JdFKnKgfDi9Xfsw=s176-c-k-c0x00ffffff-no-rj-mo" },
  { name: "FinCocktail", subs: "15K+ Subscribers", img: "https://yt3.ggpht.com/99rP2DiQF6KodU0PnDg8iO2Vfpe1buV0BsB5Cr_pjqE2pZD6jMviTJKPncbXM0FBL4bK1oVd=s176-c-k-c0x00ffffff-no-rj-mo" },
];

export default function Clientele() {
  const [randomClients, setRandomClients] = useState(clients);

  useEffect(() => {
    const shuffle = (array: typeof clients) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    setRandomClients(shuffle(clients));
  }, []);

  return (
    <section id="clientele" className="clienteleSection">
      <h2 className="title">Trusted by</h2>
      
      <div className="marqueeContainer">
        <div className="marqueeRow marqueeLeftToRight">
          {/* Double the list for infinite scroll effect */}
          {[...randomClients, ...randomClients, ...randomClients].map((client, i) => (
            <div key={`r1-${i}`} className="clientCard">
              <div className="clientAvatar">
                <img 
                  src={client.img || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(client.name)}`} 
                  alt={client.name} 
                  className="clientImage"
                />
              </div>
              <div className="clientInfo">
                <h3 className="clientName">{client.name}</h3>
                <p className="clientSubs">{client.subs}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="marqueeRow marqueeRightToLeft" style={{ marginTop: '-1px' }}>
          {/* Double the list for infinite scroll effect, reverse for variation */}
          {[...randomClients.slice().reverse(), ...randomClients.slice().reverse(), ...randomClients.slice().reverse()].map((client, i) => (
            <div key={`r2-${i}`} className="clientCard">
              <div className="clientAvatar">
                <img 
                  src={client.img || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(client.name)}`} 
                  alt={client.name} 
                  className="clientImage"
                />
              </div>
              <div className="clientInfo">
                <h3 className="clientName">{client.name}</h3>
                <p className="clientSubs">{client.subs}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
