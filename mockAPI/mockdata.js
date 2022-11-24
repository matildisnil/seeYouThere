module.exports.siteData = {
    "StatusCode": 0,
    "Message": null,
    "ExecutionTime": 0,
    "ResponseData": [
        {
            "Name": "Tensta (Stockholm)",
            "SiteId": "9321",
            "Type": "Station",
            "X": "17904723",
            "Y": "59393959",
            "Products": null
        }
    ]
}

module.exports.tripData = {
    "Trip": [
        {
            "ServiceDays": [
                {
                    "planningPeriodBegin": "2022-04-05",
                    "planningPeriodEnd": "2022-08-18",
                    "sDaysR": "mån - tor, sön",
                    "sDaysB": "E3838F1E3C78C1E1C78E3E7CF9F3E7CF9F"
                }
            ],
            "LegList": {
                "Leg": [
                    {
                        "Origin": {
                            "name": "Hornstull",
                            "type": "ST",
                            "id": "A=1@O=Hornstull@X=18035498@Y=59316032@U=74@L=400102531@",
                            "extId": "400102531",
                            "lon": 18.035498,
                            "lat": 59.316032,
                            "prognosisType": "PROGNOSED",
                            "time": "21:37:00",
                            "date": "2022-07-05",
                            "track": "1",
                            "hasMainMast": true,
                            "mainMastId": "A=1@O=Hornstull (Stockholm)@X=18034231@Y=59315537@U=74@L=300109295@",
                            "mainMastExtId": "300109295",
                            "additional": false
                        },
                        "Destination": {
                            "name": "Slussen",
                            "type": "ST",
                            "id": "A=1@O=Slussen@X=18072004@Y=59319547@U=74@L=400102011@",
                            "extId": "400102011",
                            "lon": 18.072004,
                            "lat": 59.319547,
                            "prognosisType": "PROGNOSED",
                            "time": "21:42:00",
                            "date": "2022-07-05",
                            "track": "2",
                            "hasMainMast": true,
                            "mainMastId": "A=1@O=Slussen (Stockholm)@X=18071860@Y=59320284@U=74@L=300109192@",
                            "mainMastExtId": "300109192",
                            "additional": false
                        },
                        "JourneyDetailRef": {
                            "ref": "1|10194|0|74|5072022"
                        },
                        "JourneyStatus": "P",
                        "Product": {
                            "name": "tunnelbanans röda linje 13",
                            "num": "20581",
                            "line": "13",
                            "catOut": "METRO   ",
                            "catIn": "MET",
                            "catCode": "1",
                            "catOutS": "MET",
                            "catOutL": "TUNNELBANA ",
                            "operatorCode": "SL",
                            "operator": "Storstockholms Lokaltrafik",
                            "admin": "100013"
                        },
                        "Stops": null,
                        "idx": "0",
                        "name": "tunnelbanans röda linje 13",
                        "number": "20581",
                        "category": "MET",
                        "type": "JNY",
                        "reachable": true,
                        "redirected": false,
                        "direction": "Ropsten"
                    },
                    {
                        "Origin": {
                            "name": "Slussen",
                            "type": "ST",
                            "id": "A=1@O=Slussen@X=18072004@Y=59319547@U=74@L=400102011@",
                            "extId": "400102011",
                            "lon": 18.072004,
                            "lat": 59.319547,
                            "time": "21:43:00",
                            "date": "2022-07-05",
                            "hasMainMast": true,
                            "mainMastId": "A=1@O=Slussen (Stockholm)@X=18071860@Y=59320284@U=74@L=300109192@",
                            "mainMastExtId": "300109192",
                            "additional": false
                        },
                        "Destination": {
                            "name": "Slussen",
                            "type": "ST",
                            "id": "A=1@O=Slussen@X=18072237@Y=59319618@U=74@L=400101012@",
                            "extId": "400101012",
                            "lon": 18.072237,
                            "lat": 59.319618,
                            "time": "21:45:00",
                            "date": "2022-07-05",
                            "hasMainMast": true,
                            "mainMastId": "A=1@O=Slussen (Stockholm)@X=18071860@Y=59320284@U=74@L=300109192@",
                            "mainMastExtId": "300109192",
                            "additional": false
                        },
                        "Stops": null,
                        "idx": "1",
                        "name": "",
                        "type": "WALK",
                        "reachable": true,
                        "redirected": false,
                        "duration": "PT2M",
                        "dist": 15,
                        "hide": true
                    },
                    {
                        "Origin": {
                            "name": "Slussen",
                            "type": "ST",
                            "id": "A=1@O=Slussen@X=18072237@Y=59319618@U=74@L=400101012@",
                            "extId": "400101012",
                            "lon": 18.072237,
                            "lat": 59.319618,
                            "prognosisType": "PROGNOSED",
                            "time": "21:47:00",
                            "date": "2022-07-05",
                            "track": "4",
                            "hasMainMast": true,
                            "mainMastId": "A=1@O=Slussen (Stockholm)@X=18071860@Y=59320284@U=74@L=300109192@",
                            "mainMastExtId": "300109192",
                            "additional": false
                        },
                        "Destination": {
                            "name": "Skanstull",
                            "type": "ST",
                            "id": "A=1@O=Skanstull@X=18076067@Y=59308490@U=74@L=400101522@",
                            "extId": "400101522",
                            "lon": 18.076067,
                            "lat": 59.30849,
                            "prognosisType": "PROGNOSED",
                            "time": "21:50:00",
                            "date": "2022-07-05",
                            "track": "2",
                            "hasMainMast": true,
                            "mainMastId": "A=1@O=Skanstull (Stockholm)@X=18076166@Y=59307941@U=74@L=300109190@",
                            "mainMastExtId": "300109190",
                            "additional": false
                        },
                        "JourneyDetailRef": {
                            "ref": "1|12373|0|74|5072022"
                        },
                        "JourneyStatus": "P",
                        "Product": {
                            "name": "tunnelbanans gröna linje 18",
                            "num": "10199",
                            "line": "18",
                            "catOut": "METRO   ",
                            "catIn": "MET",
                            "catCode": "1",
                            "catOutS": "MET",
                            "catOutL": "TUNNELBANA ",
                            "operatorCode": "SL",
                            "operator": "Storstockholms Lokaltrafik",
                            "admin": "101018"
                        },
                        "Stops": null,
                        "idx": "2",
                        "name": "tunnelbanans gröna linje 18",
                        "number": "10199",
                        "category": "MET",
                        "type": "JNY",
                        "reachable": true,
                        "redirected": false,
                        "direction": "Farsta strand"
                    }
                ]
            },
            "TariffResult": {
                "fareSetItem": [
                    {
                        "fareItem": [
                            {
                                "name": "Reskassa och övriga försäljningsställen",
                                "desc": "Helt pris",
                                "price": 3900,
                                "cur": "SEK"
                            },
                            {
                                "name": "Konduktör på Spårväg City",
                                "desc": "Helt pris",
                                "price": 5400,
                                "cur": "SEK"
                            },
                            {
                                "name": "Reskassa och övriga försäljningsställen",
                                "desc": "Reducerat pris",
                                "price": 2600,
                                "cur": "SEK"
                            },
                            {
                                "name": "Konduktör på Spårväg City",
                                "desc": "Reducerat pris",
                                "price": 3600,
                                "cur": "SEK"
                            }
                        ],
                        "name": "ONEWAY",
                        "desc": "SL"
                    }
                ]
            },
            "alternative": false,
            "valid": true,
            "idx": 0,
            "tripId": "C-0",
            "ctxRecon": "T$A=1@O=Hornstull@L=400102531@a=128@$A=1@O=Slussen@L=400102011@a=128@$202207052137$202207052142$        $§W$A=1@O=Slussen@L=400102011@a=128@$A=1@O=Slussen@L=400101012@a=128@$202207052143$202207052145$$§T$A=1@O=Slussen@L=400101012@a=128@$A=1@O=Skanstull@L=400101522@a=128@$202207052147$202207052150$        $",
            "duration": "PT13M",
            "return": false,
            "checksum": "29961553_4",
            "transferCount": 0
        }
    ],
    "scrB": "1|OB|MTµ11µ135217µ135217µ135230µ135230µ0µ0µ85µ135217µ1µ-2147483646µ0µ1µ2|PDHµf7c72d8a12014c06451a216924f3e35e",
    "scrF": "1|OF|MTµ11µ135230µ135230µ135241µ135241µ0µ0µ5µ135229µ5µ-2147483646µ0µ1µ2|PDHµf7c72d8a12014c06451a216924f3e35e",
    "serverVersion": "1.4",
    "dialectVersion": "1.23",
    "requestId": "1657049846771"
}