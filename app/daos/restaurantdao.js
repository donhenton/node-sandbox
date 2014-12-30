module.exports = function (app) {

    var daoService = {};

    var restaurantListIndex = {};


    daoService.createIdResponse = function (idValue)
    {
        var id = {};
        id["id"] = idValue;
        return id;
    };
    daoService.createError = function (message, classVar)
    {
        var e = {};
        e["message"] = message;
        e["errorClass"] = classVar;
        return e;
    };
    daoService.saveRestaurant = function (newRestaurant)
    {
        var errorMessage = null;
        var lookup = daoService.getRestaurantById(newRestaurant.id);
        // console.log("in save key " + newRestaurant.id + " " + lookup);
        if (lookup == null)
        {
            errorMessage = "unable to find restaurant with id of " +
                    newRestaurant.id;

        }
        else
        {
            daoService.loadRestaurant(lookup, newRestaurant);
        }


        return errorMessage;
    };

    daoService.loadRestaurant = function (destRestaurant, sourceRestaurant)
    {
        destRestaurant.name = sourceRestaurant.name;
        destRestaurant.zipCode = sourceRestaurant.zipCode;
        destRestaurant.city = sourceRestaurant.city;
        destRestaurant.state = sourceRestaurant.state;
        destRestaurant.version = sourceRestaurant.version;
        destRestaurant.is_current = sourceRestaurant.is_current;
        destRestaurant.id = sourceRestaurant.id;
    };

    daoService.getRestaurantById = function (id)
    {
        var f = restaurantListIndex[id];
        if (typeof f == 'undefined')
        {
            return null;
        }
        else
        {
            return f;
        }
    };
    daoService.getAllRestaurants = function ()
    {
        return g_restaurantData;
    };
    daoService.createNewId = function ()
    {
        return (new Date()).getTime();
    };
    /**
     * 
     * @param {type} newRestaurant
     * @returns a string with error message or null
     */
    daoService.createRestaurant = function (r)
    {
        var errorMessage = null;
        r.id = daoService.createNewId();
        this.getAllRestaurants().unshift(r);
        r.reviewDTOs = [];
        setUpRestaurantList();
        return errorMessage;
    };

    daoService.deleteRestaurant = function (restaurant)
    {
        //locate the restaurant by walking the array
        //
        //splice it out
        //setUpRestaurantList();
        //console.log("del 1");
        var errorMessage = null;
        var idx = -1;
        var resCollection = this.getAllRestaurants();
        //console.log("del 2 "+resCollection.length);

        for (i = 0; i < resCollection.length; i++)
        {
            if (resCollection[i].id === restaurant.id)
            {
                idx = i;
                //console.log("del 3 hit "+idx)
                break;
            }
        }
        //console.log("dao delete4 "+idx)
        if (idx > -1)
        {
            resCollection.splice(idx, 1);
            //console.log("dao delete5 "+idx)
            setUpRestaurantList();
            //console.log("dao delete6 "+idx)
        }
        else
        {
            errorMessage = "unable to find restaurant with id of " +
                    restaurant.id;
        }

        return errorMessage;


    };
//////////////////////////////

    daoService.deleteReview = function (restaurantId, newReviewId)
    {
        var currentRestaurant =
                daoService.getRestaurantById(restaurantId)
        var message = null;
        if (currentRestaurant != null)
        {
            var reviews = currentRestaurant.reviewDTOs;
            var foundReview = false;
            for (var i = 0; i < reviews.length; i++)
            {
                if (reviews[i].id === newReviewId)
                {
                    foundReview = true;
                    reviews.splice(i, 1);
                    break;
                }
            }
            if (!foundReview)
            {
                message = "unable to find review " + newReviewId + " for restaurant " +
                        restaurantId;
            }
        }
        else
        {
            message = "unable to find restaurant with id of " +
                    restaurantId;
        }
        return message;
    };

    daoService.addReview = function (restaurantId, review)
    {
        var currentRestaurant =
                daoService.getRestaurantById(restaurantId)
        var message = null;
        if (currentRestaurant != null)
        {
            var reviews = currentRestaurant.reviewDTOs;
            review.id = daoService.createNewId();
            reviews.push(review);
        }
        else
        {
            message = "unable to find restaurant with id of " +
                    restaurantId;
        }
        return message;

    };

    daoService.saveReview = function (restaurantId, reviewId, review)
    {
        var currentRestaurant =
                daoService.getRestaurantById(restaurantId)
        var message = null;
        if (currentRestaurant != null)
        {
            var reviews = currentRestaurant.reviewDTOs;
            var foundReview = false;
            for (var i = 0; i < reviews.length; i++)
            {
                if (reviews[i].id === reviewId)
                {
                    foundReview = true;
                    // console.log("found review");
                    reviews[i] = review;
                }
            }
            if (!foundReview)
            {
                message = "unable to find review " + reviewId + " for restaurant " +
                        restaurantId;
            }
        }
        else
        {
            message = "unable to find restaurant with id of " +
                    restaurantId;
        }
        return message;

    };

    var g_restaurantData = [
        {
            "city": " San Francisco",
            "id": 5479141319114752,
            "name": "A1 Ocean Cafe #22",
            "reviewDTOs": [
                {
                    "id": 5846034605408256,
                    "parentRestaurantId": 5479141319114752,
                    "reviewListing": "not much here",
                    "stampDate": 1384618698453,
                    "starRating": 4
                },
                {
                    "id": 5805593193349120,
                    "parentRestaurantId": 5479141319114752,
                    "reviewListing": "bonzo dog band liked it!!",
                    "stampDate": 1384618698453,
                    "starRating": 4
                }
            ],
            "state": " CA",
            "version": 1,
            "zipCode": " 94104"
        },
        {
            "city": " Rockford",
            "id": 6186539612635136,
            "name": "Angle Inn Restaurant",
            "reviewDTOs": [
                {
                    "id": 5629499534213120,
                    "parentRestaurantId": 6186539612635136,
                    "reviewListing": "Consider suicide first",
                    "stampDate": 1381604311594,
                    "starRating": 5
                },
                {
                    "id": 5838406743490560,
                    "parentRestaurantId": 6186539612635136,
                    "reviewListing": "Get a job, instead of eating here!",
                    "stampDate": 1381604311595,
                    "starRating": 3
                }
            ],
            "state": " IL",
            "version": 1,
            "zipCode": " 61103"
        },
        {
            "city": " Indianapolis",
            "id": 4811188005240832,
            "name": "Arby's",
            "reviewDTOs": [],
            "state": " IN",
            "version": 1,
            "zipCode": " 46268"
        },
        /*    
         
         {
         "city": " Klamath Falls",
         "id": 6067380039974912,
         "name": "Arby's Roast Beef Restaurant",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 6067380039974912,
         "reviewListing": "Get a job, instead of eating here!",
         "stampDate": 1381604300913,
         "starRating": 1
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": 6067380039974912,
         "reviewListing": "You won't live long enough to regret it",
         "stampDate": 1381604300913,
         "starRating": 4
         }
         ],
         "state": " OR",
         "version": 1,
         "zipCode": " 97603"
         },
         {
         "city": " Waco",
         "id": 6710044586409984,
         "name": "Bangkok Royal",
         "reviewDTOs": [
         {
         "id": 5707702298738688,
         "parentRestaurantId": null,
         "reviewListing": "More 'bang' for the buck!!",
         "stampDate": 1384783684566,
         "starRating": 6
         }
         ],
         "state": " TX",
         "version": 1,
         "zipCode": " 76706"
         },
         {
         "city": " Hilo",
         "id": 5207287069147136,
         "name": "Beach Dog Computer Center",
         "reviewDTOs": [
         {
         "id": 5891733057437696,
         "parentRestaurantId": 5207287069147136,
         "reviewListing": "A real gas!!",
         "stampDate": 1403205211711,
         "starRating": 3
         },
         {
         "id": 5799236641751040,
         "parentRestaurantId": 5207287069147136,
         "reviewListing": "Consider suicide first",
         "stampDate": 1403205211711,
         "starRating": 5
         },
         {
         "id": 5872285445521408,
         "parentRestaurantId": 5207287069147136,
         "reviewListing": "Mediocre soups and disgusting desserts",
         "stampDate": 1403205211711,
         "starRating": 7
         }
         ],
         "state": " HI",
         "version": 3,
         "zipCode": " 96720"
         },
         {
         "city": " Davidsville",
         "id": 4863277368606720,
         "name": "Blough's Delicatessen",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 4863277368606720,
         "reviewListing": "You can't eat it here, even if you want to!",
         "stampDate": 1384617282460,
         "starRating": 3
         }
         ],
         "state": " PA",
         "version": 1,
         "zipCode": " 15928"
         },
         {
         "city": " Columbia",
         "id": 4850632984887296,
         "name": "Bojangles",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 4850632984887296,
         "reviewListing": "a blast",
         "stampDate": 1381604303551,
         "starRating": 8
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": 4850632984887296,
         "reviewListing": "Mediocre soups and disgusting desserts",
         "stampDate": 1381604303551,
         "starRating": 6
         },
         {
         "id": 5733953138851840,
         "parentRestaurantId": 4850632984887296,
         "reviewListing": "nnnn",
         "stampDate": 1388192479481,
         "starRating": 3
         }
         ],
         "state": " SC",
         "version": 1,
         "zipCode": " 29203"
         },
         {
         "city": "Bronson",
         "id": 5883693952401408,
         "name": "Bronson Burgers To Go",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 5883693952401408,
         "reviewListing": "good grease for those who like that ",
         "stampDate": 1402336064265,
         "starRating": 4
         }
         ],
         "state": "MO",
         "version": 1,
         "zipCode": "45986"
         },
         {
         "city": " New York",
         "id": 5556931766779904,
         "name": "Buffas Delicatessen",
         "reviewDTOs": [
         {
         "id": 5665319561461760,
         "parentRestaurantId": 5556931766779904,
         "reviewListing": "A <root> canal would be better",
         "stampDate": 1403268961100,
         "starRating": 4
         },
         {
         "id": 5743522325987328,
         "parentRestaurantId": 5556931766779904,
         "reviewListing": "Get a job, instead of eating here!",
         "stampDate": 1403268961100,
         "starRating": 11
         },
         {
         "id": 5650716672655360,
         "parentRestaurantId": 5556931766779904,
         "reviewListing": "Can you say 'gastric bypass'?",
         "stampDate": 1403268961100,
         "starRating": 5
         }
         ],
         "state": " NY",
         "version": 4,
         "zipCode": " 10012"
         },
         {
         "city": " Houston",
         "id": 6630329993396224,
         "name": "Burger King",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": "A root canal would be better",
         "stampDate": 1381604317142,
         "starRating": 6
         }
         ],
         "state": " TX",
         "version": 1,
         "zipCode": " 77070"
         },
         {
         "city": " Peoria",
         "id": 5530680926666752,
         "name": "Carl's Jr",
         "reviewDTOs": [
         {
         "id": 5838406743490560,
         "parentRestaurantId": 5530680926666752,
         "reviewListing": "Impeccable service!",
         "stampDate": 1381604306431,
         "starRating": 3
         },
         {
         "id": 5733953138851840,
         "parentRestaurantId": 5530680926666752,
         "reviewListing": "you've got to be kidding me",
         "stampDate": 1381604306431,
         "starRating": 6
         },
         {
         "id": 5891733057437696,
         "parentRestaurantId": 5530680926666752,
         "reviewListing": "A root canal would be better",
         "stampDate": 1381604306431,
         "starRating": 5
         }
         ],
         "state": " IL",
         "version": 1,
         "zipCode": " 61615"
         },
         {
         "city": " Thomson",
         "id": 6473924464345088,
         "name": "Casey's Carry Out Pizza",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": "A root canal would be better",
         "stampDate": 1381604312025,
         "starRating": 7
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": null,
         "reviewListing": "A real gas",
         "stampDate": 1381604312025,
         "starRating": 1
         }
         ],
         "state": " IL",
         "version": 1,
         "zipCode": " 61285"
         },
         {
         "city": " Cedar Rapids",
         "id": 6656580833509376,
         "name": "China King",
         "reviewDTOs": [
         {
         "id": 5838406743490560,
         "parentRestaurantId": null,
         "reviewListing": "A root canal would be better",
         "stampDate": 1384618115515,
         "starRating": 4
         }
         ],
         "state": " IA",
         "version": 1,
         "zipCode": " 52404"
         },
         {
         "city": " Odell",
         "id": 6093630880088064,
         "name": "Chuby's",
         "reviewDTOs": [
         {
         "id": 5838406743490560,
         "parentRestaurantId": null,
         "reviewListing": "Get a job, instead of eating here!",
         "stampDate": 1384645979568,
         "starRating": 3
         }
         ],
         "state": " OR",
         "version": 1,
         "zipCode": " 97044"
         },
         {
         "city": " Gainesville",
         "id": 6042091272536064,
         "name": "Cinnabon",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": "Get a job, instead of eating here!",
         "stampDate": 1381604311081,
         "starRating": 8
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": null,
         "reviewListing": "Consider suicide first",
         "stampDate": 1381604311081,
         "starRating": 2
         },
         {
         "id": 5733953138851840,
         "parentRestaurantId": null,
         "reviewListing": "A root canal would be better",
         "stampDate": 1381604311081,
         "starRating": 3
         }
         ],
         "state": " FL",
         "version": 1,
         "zipCode": " 32605"
         },
         {
         "city": " Cameron",
         "id": 6682831673622528,
         "name": "Dairy Queen Brazier",
         "reviewDTOs": [
         {
         "id": 5733953138851840,
         "parentRestaurantId": null,
         "reviewListing": "Consider suicide first",
         "stampDate": 1384646036641,
         "starRating": 1
         },
         {
         "id": 5695057915019264,
         "parentRestaurantId": null,
         "reviewListing": null,
         "stampDate": 1384646036641,
         "starRating": 5
         }
         ],
         "state": " MO",
         "version": 1,
         "zipCode": " 64429"
         },
         {
         "city": " Carter Lake",
         "id": 6029034571956224,
         "name": "Dairy Queen restaurant ",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 6029034571956224,
         "reviewListing": "You can't get there from here",
         "stampDate": 1381604310381,
         "starRating": 1
         }
         ],
         "state": " IA",
         "version": 1,
         "zipCode": " 51510"
         },
         {
         "city": " Loveland",
         "id": 5610258080727040,
         "name": "Domino's Pizza",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 5610258080727040,
         "reviewListing": "very interesting anchovies!!",
         "stampDate": 1381604305764,
         "starRating": 3
         },
         {
         "id": 5733953138851840,
         "parentRestaurantId": 5610258080727040,
         "reviewListing": "A root canal would be better",
         "stampDate": 1381604305764,
         "starRating": 8
         },
         {
         "id": 5891733057437696,
         "parentRestaurantId": 5610258080727040,
         "reviewListing": "Impeccable service!",
         "stampDate": 1381604305764,
         "starRating": 3
         }
         ],
         "state": " CO",
         "version": 1,
         "zipCode": " 80537"
         },
         {
         "city": " Shawnee",
         "id": 5348024557502464,
         "name": "El Toro Bar & Grill",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 5348024557502464,
         "reviewListing": "really worth the time!!",
         "stampDate": 1381604307100,
         "starRating": 8
         }
         ],
         "state": " KS",
         "version": 1,
         "zipCode": " 66216"
         },
         {
         "city": " Oshkosh",
         "id": 5937087912083456,
         "name": "Fox River Brew Pub",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": "Consider suicide first",
         "stampDate": 1381604317422,
         "starRating": 5
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": null,
         "reviewListing": "A real gas",
         "stampDate": 1381604317422,
         "starRating": 6
         },
         {
         "id": 5733953138851840,
         "parentRestaurantId": null,
         "reviewListing": "Get a job, instead of eating here!",
         "stampDate": 1381604317422,
         "starRating": 3
         }
         ],
         "state": " WI",
         "version": 1,
         "zipCode": " 54901"
         },
         {
         "city": " Portland",
         "id": 5584144679567360,
         "name": "Fruition",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 5584144679567360,
         "reviewListing": "Get a job, instead of eating here!",
         "stampDate": 1381604309660,
         "starRating": 3
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": 5584144679567360,
         "reviewListing": "you've got to be kidding!!!",
         "stampDate": 1385734802199,
         "starRating": 8
         }
         ],
         "state": " OR",
         "version": 1,
         "zipCode": " 97210"
         },
         {
         "city": " Las Vegas",
         "id": 4644337115725824,
         "name": "Giovanni's Pizzeria oh my!!",
         "reviewDTOs": [
         {
         "id": 5910046797987840,
         "parentRestaurantId": 4644337115725824,
         "reviewListing": "Mediocre soups and disgusting desserts",
         "stampDate": 1395103604548,
         "starRating": 1
         },
         {
         "id": 5778586438991872,
         "parentRestaurantId": 4644337115725824,
         "reviewListing": "A root canal would be better",
         "stampDate": 1395103604548,
         "starRating": 2
         },
         {
         "id": 5844419697704960,
         "parentRestaurantId": 4644337115725824,
         "reviewListing": "yoyoyo",
         "stampDate": 1395103653386,
         "starRating": 8
         }
         ],
         "state": " NV",
         "version": 1,
         "zipCode": " 89123"
         },
         {
         "city": " Waipahu",
         "id": 5426227322028032,
         "name": "Golden Coin Bake Shop & Restaurant",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 5426227322028032,
         "reviewListing": "look out for the pancakes",
         "stampDate": 1381604314421,
         "starRating": 8
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": 5426227322028032,
         "reviewListing": "A root canal would be better",
         "stampDate": 1381604314421,
         "starRating": 1
         }
         ],
         "state": " HI",
         "version": 1,
         "zipCode": " 96797"
         },
         {
         "city": " Murfreesboro",
         "id": 5060639705792512,
         "name": "Hardee's of Murfreesboro No 4",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": "Get a job, instead of eating here!",
         "stampDate": 1381604310049,
         "starRating": 5
         }
         ],
         "state": " TN",
         "version": 1,
         "zipCode": " 37128"
         },
         {
         "city": " Chelmsford",
         "id": 5021194726146048,
         "name": "Hong & Kong Restaurant",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 5021194726146048,
         "reviewListing": "A real gas",
         "stampDate": 1381604304621,
         "starRating": 3
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": 5021194726146048,
         "reviewListing": "a whole lot of gastric delight going on!",
         "stampDate": 1381604304621,
         "starRating": 8
         },
         {
         "id": 5733953138851840,
         "parentRestaurantId": 5021194726146048,
         "reviewListing": "Consider suicide first",
         "stampDate": 1381604304621,
         "starRating": 5
         },
         {
         "id": 5891733057437696,
         "parentRestaurantId": 5021194726146048,
         "reviewListing": "Mediocre soups and disgusting desserts",
         "stampDate": 1381604304621,
         "starRating": 14
         }
         ],
         "state": " MA",
         "version": 1,
         "zipCode": " 01824"
         },
         {
         "city": " Calhoun",
         "id": 6310509548666880,
         "name": "Huddle House",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": "Can you say 'gastric bypass'?",
         "stampDate": 1381604301914,
         "starRating": 8
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": null,
         "reviewListing": "Get a job, instead of eating here!",
         "stampDate": 1381604301914,
         "starRating": 2
         }
         ],
         "state": " GA",
         "version": 1,
         "zipCode": " 30701"
         },
         {
         "city": " Omaha",
         "id": 5989177275449344,
         "name": "Huhot Mongolian Grill",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 5989177275449344,
         "reviewListing": "A root canal would be better",
         "stampDate": 1381604313190,
         "starRating": 4
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": 5989177275449344,
         "reviewListing": "More beans than a burrito",
         "stampDate": 1381604313190,
         "starRating": 3
         },
         {
         "id": 5733953138851840,
         "parentRestaurantId": 5989177275449344,
         "reviewListing": "A real gas",
         "stampDate": 1381604313190,
         "starRating": 5
         }
         ],
         "state": " NE",
         "version": 1,
         "zipCode": " 68154"
         },
         {
         "city": " Shreveport",
         "id": 5452478162141184,
         "name": "Imperial Wok Chinese Restaurant",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": "Mediocre soups and disgusting desserts",
         "stampDate": 1381604310683,
         "starRating": 4
         }
         ],
         "state": " LA",
         "version": 1,
         "zipCode": " 71118"
         },
         {
         "city": " Indianapolis",
         "id": 6173208034148352,
         "name": "John Browne's Pub & Eatery",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 6173208034148352,
         "reviewListing": "YUM!!!",
         "stampDate": 1394762982575,
         "starRating": 6
         }
         ],
         "state": " IN",
         "version": 1,
         "zipCode": " 46235"
         },
         {
         "city": " Milwaukee",
         "id": 5963201313243136,
         "name": "Ling's Express",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": "Can you say 'gastric bypass'?",
         "stampDate": 1381604302490,
         "starRating": 7
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": null,
         "reviewListing": "Impeccable service!",
         "stampDate": 1381604302490,
         "starRating": 8
         },
         {
         "id": 5733953138851840,
         "parentRestaurantId": null,
         "reviewListing": "Impeccable service!",
         "stampDate": 1381604302490,
         "starRating": 4
         }
         ],
         "state": " WI",
         "version": 1,
         "zipCode": " 53217"
         },
         {
         "city": " Oakton",
         "id": 4537134732017664,
         "name": "Luciano Italian Restaurant",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": "Impeccable service!",
         "stampDate": 1381604309259,
         "starRating": 7
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": null,
         "reviewListing": "Get a job, instead of eating here!",
         "stampDate": 1381604309259,
         "starRating": 6
         }
         ],
         "state": " VA",
         "version": 1,
         "zipCode": " 22124"
         },
         {
         "city": " Brooklyn",
         "id": 5374137958662144,
         "name": "Maria's Mexican Bistro Inc",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": null,
         "stampDate": 1381604318570,
         "starRating": 8
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": null,
         "reviewListing": "Consider suicide first",
         "stampDate": 1381604318570,
         "starRating": 7
         }
         ],
         "state": " NY",
         "version": 1,
         "zipCode": " 11215"
         },
         {
         "city": " San Francisco",
         "id": 5805043437535232,
         "name": "Marmaduke's Place",
         "reviewDTOs": [
         {
         "id": 5707702298738688,
         "parentRestaurantId": 5805043437535232,
         "reviewListing": "Dog food at its best",
         "stampDate": 1388195038117,
         "starRating": 1
         }
         ],
         "state": " CA",
         "version": 10,
         "zipCode": " 94104"
         },
         {
         "city": " Racine",
         "id": 4615887252357120,
         "name": "McGambo's Gumbo Restaurant ",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": "happy as a clam",
         "stampDate": 1384636964588,
         "starRating": 6
         }
         ],
         "state": " WI",
         "version": 1,
         "zipCode": " 53406"
         },
         {
         "city": "Blasting Cap",
         "id": 4967730973245440,
         "name": "Monty's House of Snakes",
         "reviewDTOs": [
         {
         "id": 5831844033462272,
         "parentRestaurantId": 4967730973245440,
         "reviewListing": "Mediocre soups and disgusting desserts",
         "stampDate": 1392411102320,
         "starRating": 7
         },
         {
         "id": 5910046797987840,
         "parentRestaurantId": 4967730973245440,
         "reviewListing": "Can you say 'gastric bypass'?",
         "stampDate": 1392411102320,
         "starRating": 2
         }
         ],
         "state": "VT",
         "version": 33,
         "zipCode": "04534"
         },
         {
         "city": "Blasting Cap",
         "id": 5870670537818112,
         "name": "Monty's House of Snakes",
         "reviewDTOs": [],
         "state": "VT",
         "version": 33,
         "zipCode": "04534"
         },
         {
         "city": " Memphis",
         "id": 6119881720201216,
         "name": "NPC International",
         "reviewDTOs": [
         {
         "id": 5838406743490560,
         "parentRestaurantId": null,
         "reviewListing": "Consider suicide first",
         "stampDate": 1384783908274,
         "starRating": 5
         },
         {
         "id": 5905064635924480,
         "parentRestaurantId": null,
         "reviewListing": "Great pie and desserts",
         "stampDate": 1384783908275,
         "starRating": 3
         }
         ],
         "state": " TN",
         "version": 1,
         "zipCode": " 38134"
         },
         {
         "city": " Independence",
         "id": 5770237022568448,
         "name": "O'Charley's Restaurant 34",
         "reviewDTOs": [
         {
         "id": 5698390809640960,
         "parentRestaurantId": 5770237022568448,
         "reviewListing": "nothing to see here",
         "stampDate": 1394152711440,
         "starRating": 8
         },
         {
         "id": 5764017909923840,
         "parentRestaurantId": 5770237022568448,
         "reviewListing": "Impeccable service!",
         "stampDate": 1394152711440,
         "starRating": 7
         },
         {
         "id": 5632763709358080,
         "parentRestaurantId": 5770237022568448,
         "reviewListing": "Not much better than rat poison!",
         "stampDate": 1394152711440,
         "starRating": 1
         }
         ],
         "state": " MO",
         "version": 1,
         "zipCode": " 64057"
         },
         {
         "city": " Naperville",
         "id": 5400251359821824,
         "name": "Pancake Cafe",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": null,
         "reviewListing": "Mediocre soups and disgusting desserts",
         "stampDate": 1381604304338,
         "starRating": 2
         }
         ],
         "state": " IL",
         "version": 1,
         "zipCode": " 60540"
         },
         {
         "city": "Smurf",
         "id": 5818821692620800,
         "name": "Puddleglum's House of Delights",
         "reviewDTOs": [],
         "state": "WI",
         "version": 3,
         "zipCode": "40404"
         },
         {
         "city": " Salt Lake City",
         "id": 6526151266664448,
         "name": "Sonic Drive In",
         "reviewDTOs": [
         {
         "id": 5891733057437696,
         "parentRestaurantId": null,
         "reviewListing": "Get a job, instead of eating here!",
         "stampDate": 1384632306196,
         "starRating": 6
         },
         {
         "id": 5799236641751040,
         "parentRestaurantId": null,
         "reviewListing": "A root canal would be better",
         "stampDate": 1384632306196,
         "starRating": 8
         }
         ],
         "state": " UT",
         "version": 1,
         "zipCode": " 84118"
         },
         {
         "city": " Lonoke",
         "id": 4903134665113600,
         "name": "Subway 56",
         "reviewDTOs": [
         {
         "id": 5737767069810688,
         "parentRestaurantId": 4903134665113600,
         "reviewListing": "Mediocre soups and disgusting desserts",
         "stampDate": 1403205266418,
         "starRating": 5
         },
         {
         "id": 5652331580358656,
         "parentRestaurantId": 4903134665113600,
         "reviewListing": "Impeccable service!",
         "stampDate": 1403205266418,
         "starRating": 1
         },
         {
         "id": 5717546363781120,
         "parentRestaurantId": 4903134665113600,
         "reviewListing": "a smorgasboard of boredom!!",
         "stampDate": 1403205266418,
         "starRating": 6
         }
         ],
         "state": " AR",
         "version": 1,
         "zipCode": " 72086"
         },
         {
         "city": " Knoxville",
         "id": 5976532891729920,
         "name": "Subway Sandwiches & Hard Knox",
         "reviewDTOs": [
         {
         "id": 5747559595245568,
         "parentRestaurantId": 5976532891729920,
         "reviewListing": "A root canal would be better",
         "stampDate": 1384632196246,
         "starRating": 5
         },
         {
         "id": 5727390428823552,
         "parentRestaurantId": 5976532891729920,
         "reviewListing": "Can you say 'gastric bypass'?",
         "stampDate": 1384632196246,
         "starRating": 6
         }
         ],
         "state": " TN",
         "version": 1,
         "zipCode": " 37924"
         },
         {
         "city": " New Orleans",
         "id": 6736157987569664,
         "name": "Subway Sandwiches & Salads",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 6736157987569664,
         "reviewListing": "Note worth a plug pistoola!@",
         "stampDate": 1381604307386,
         "starRating": 2
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": 6736157987569664,
         "reviewListing": "Get a job, instead of eating here!",
         "stampDate": 1381604307386,
         "starRating": 8
         }
         ],
         "state": " LA",
         "version": 1,
         "zipCode": " 70123"
         },
         {
         "city": " Providence",
         "id": 5413582938308608,
         "name": "Sue's Restaurant",
         "reviewDTOs": [
         {
         "id": 5629499534213120,
         "parentRestaurantId": 5413582938308608,
         "reviewListing": "A real gas",
         "stampDate": 1381604319012,
         "starRating": 5
         },
         {
         "id": 5838406743490560,
         "parentRestaurantId": 5413582938308608,
         "reviewListing": "More fun than a barrel of monkeys",
         "stampDate": 1381604319012,
         "starRating": 5
         }
         ],
         "state": " RI",
         "version": 1,
         "zipCode": " 02903"
         }
         */
    ];



    var setUpRestaurantList = function ()

    {
        console.log("setting list");
        app.daoService = daoService;
        restaurantListIndex = {};
        g_restaurantData.forEach(function (restaurant)
        {
            restaurantListIndex[restaurant.id] = restaurant;
            if (typeof restaurant.reviewDTOs == 'undefined')
            {
                restaurant.reviewDTOs = [];
            }
        });

    };
    setUpRestaurantList();

};