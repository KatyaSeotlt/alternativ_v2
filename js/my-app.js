var serverpath="http://78.108.87.128/api/";//"http://victrack.ru/api/";
var myMap=false;
var lat='';
var lng='';
var vicFunc = new victoryExchangeFunc();
var userProfileData=false;
var opendopinfo=true;
var relise=false;
var cityIsSearched=0;
var loading = 0;
var last_page=0;
var pagelistload=0; 
var openRoute=0;
var payment_types=lang.payment_types;
var car_types=lang.car_types;
var subscriptionsfrom='';
var subscriptionsto='';
var map_Routes_Detail='';
var loginclickisset=0;
var selfPosition;
var routeApp=false;
var search=1;
var lastrequest='';
var lastrequestdata='';
var lastrequestvariable='';
var cargo_types=lang.cargo_types;
var loading_types=lang.loading_types;
function map_error(e){
	
}
function victoryExchangeFunc() {
	var _this=this;	
	var requestnow = 0; //have request now
	var activeCitySearch='';//who is search city
//check user autorize
   this.isLogin = function () {
     	return !(window.localStorage.getItem("access_token")===undefined || window.localStorage.getItem("access_token")==="undefined" || window.localStorage.getItem("access_token")===null);
    };

//router data: type = getpath or setdata
//responseData - sometimes is ID
this.route = function(type, data, responseData){
	switch(data) {
		case 'list':
			if(type=='getpath'){return{path:'list', method:'GET'};}else{search=1;_this.routesshow(responseData,'#listblocks');}
		break;
		case 'map_points':
			if(type=='getpath'){return{path:'map/points',method:'POST'};}else{_this.createMap(responseData);}
		break;
		case 'person':
			if(type=='getpath'){return{path:'settings/profile/edit',method:'GET'};}else{_this.setUserProfile(responseData);}
		break;
		case 'orders':
			if(type=='getpath'){return{path:'orders',method:'GET'};}else{search=1;_this.routesshow(responseData,'#routesblocks');}
		break;
		case 'map_detail':
			if(type=='getpath'){return{path:'map/points/info', method:'POST'};}else{_this.mapRoutesDetail(responseData);}
		break;
		case 'firstperson':
			if(type=='getpath'){return{path:'settings/profile/edit',method:'GET'};}else{userProfileData=responseData; }
		break;
		case 'subscriptions':
			if(type=='getpath'){return{path:'settings/profile/edit',method:'GET'};}else{userProfileData=responseData;_this.showSubscribe();}
		break;
		case 'getmycars':
			if(type=='getpath'){return{path:'settings/profile/edit',method:'GET'};}else{userProfileData=responseData;_this.carsshow();}
		break;
		case 'activationuserlogin':
			if(type=='getpath'){return{path:'resend/',method:'POST'};}else{_this.activationuserlogin(responseData);}
		break;
		case 'cities_search':
			if(type=='getpath'){return{path:'cities/'+responseData,method:'GET'};}else{cityIsSearched=0;_this.createDivCity(responseData);}
		break;
		case 'person_edit':
			if(type=='getpath'){return{path:'settings/profile/edit', method:'POST'};}else{}
		break;
		case 'map':
			if(type=='getpath'){return{path:'map',method:'POST'}; }else{myApp.closePanel();_this.createMap(responseData);}
		break;
		case 'list_search':
			if(type=='getpath'){return{path:'list',method:'POST'};}else{myApp.closePanel();search=0;_this.routesshow(responseData,'#listblocks');}
		break;
		case 'car_types':
			if(type=='getpath'){return{path:'settings/cars/types',method:'GET'};}else{car_types=responseData;vicFunc.carsshow();}
		break;
		case 'cargo_types':
			if(type=='getpath'){return{path:'settings/cargo/types',method:'GET'};}else{cargo_types=responseData;}
		break;
		case 'payment_types':
			if(type=='getpath'){return{path:'settings/payment/types',method:'GET'};}else{payment_types=responseData;}
		break;
		case 'loading_types':
			if(type=='getpath'){return{path:'settings/loading/types',method:'GET'};}else{loading_types=responseData;}
		break;
		case 'car_create':
			if(type=='getpath'){return{path:'settings/cars/create',method:'POST'};}else{_this.savecardata(responseData);vicFunc.carsshow();}
		break;
		case 'tickets':
			if(type=='getpath'){return{path:'tickets-list',method:'GET'};}else{_this.ticketThemeCreate(responseData);}
		break;
		case 'create_subscriptions':
		   if(type=='getpath'){return{path:'settings/subscriptions/create',method:'POST'};}else{_this.addSubscriptions(responseData);}
		break;
		case 'callback':
			if(type=='getpath' && !_this.isUndefined(responseData) ){return{path:responseData+'/callback',method:'POST'};}else{}
		break;
		case 'orders_nextstate':
			if(type=='getpath' && !_this.isUndefined(responseData) ){return{path:'orders/'+responseData+'/nextstate',method:'POST'};}else{}
		break;
		case 'ticket_view':
			if(type=='getpath' && !_this.isUndefined(responseData) ){return{path:'tickets-list/'+responseData+'/view',method:'GET'};}else{_this.ticketThemeView(responseData);}
		break;
		case 'ticket_message':
			if(type=='getpath' && !_this.isUndefined(responseData) ){ return {path:'tickets-list/'+responseData+'/message', method:'POST'}; }else{_this.ticket_message(responseData);}
		break;
		case 'ticket_close':
			if(type=='getpath' && !_this.isUndefined(responseData) ){ return {path:'tickets-list/'+responseData+'/close', method:'POST'}; }else{}
		break;
		case 'ticket_order':
			if(type=='getpath' && !_this.isUndefined(responseData)){ return {path: responseData+'/ticket', method:'POST'}; }else{myApp.closeModal('.popup-addticket');_this.openInfoPopup(lang.tiket_created);}
		break;
		case 'delete_subscriptions':
			if(type=='getpath' && !_this.isUndefined(responseData)){ return {path:'settings/subscriptions/'+responseData+'/delete', method:'DELETE'}; }else{ }
		break;
		case 'enable_subscriptions':
			if(type=='getpath' && !_this.isUndefined(responseData)){ return {path:'settings/subscriptions/'+responseData+'/enable', method:'POST'}; }else{ }
		break;
		case 'car_delete':
			if(type=='getpath' && !_this.isUndefined(responseData)){return {path:'settings/cars/'+responseData+'/delete', method:'DELETE'};}else{}
		break;
		case 'enable_cars':
			if(type=='getpath' && !_this.isUndefined(responseData)){return {path:'settings/cars/'+responseData+'/enable', method:'POST'};}else{}
		break;
		case 'car_edit':
			if(type=='getpath' && !_this.isUndefined(responseData)){ return {path:'settings/cars/'+responseData+'/edit', method:'POST'}; }else{}
		break;
		case 'get_car_edit':
			if(type=='getpath' && !_this.isUndefined(responseData)){ return {path:'settings/cars/'+responseData+'/edit', method:'GET'}; }else{ _this.changeCar(responseData);} 
		break;
		case 'addtosubscriptions':
			if(type=='getpath' && !_this.isUndefined(responseData)){ return {path: responseData+'/addtosubscriptions', method:'POST',accept:'text/html'};}else{_this.openInfoPopup(lang.route_set_in_subscribe);}
		break;
		case 'rateoffer':
			if(type=='getpath' && !_this.isUndefined(responseData)){ return {path: responseData+'/rateoffer', method:'POST'}; }else{_this.openInfoPopup(lang.rate_seng_dispether);}
		break;
		case 'routerequest':
			if(type=='getpath' && !_this.isUndefined(responseData)){ return {path: responseData+'/routerequest', method:'POST'}; }else{_this.openInfoPopup(lang.rate_seng_dispether);}
		break;
		case 'callback':
			if(type=='getpath' && !_this.isUndefined(responseData)){ return {path: responseData+'/callback', method:'POST'}; }else{_this.openInfoPopup(lang.rate_seng_dispether);}
		break;	
	
	} 
};

 
this.login=function(login, password) {
	
		var data={phone:login, password: password};
		 
		var header = {'Accept':'application/json', 'X-Requested-With':'XMLHttpRequest'}; 
		 
		var xhr = $$.ajax({
                method: 'POST',
                url: serverpath+'login/',
                crossDomain: true,
					 dataType: 'json',
                headers: header,
                contentType: 'application/x-www-form-urlencoded', // 'application/json',
                data: data,
                error: function (xhr) {
					
					 _this.login_first_error(xhr);
					
					},
				success: function (data) {
				 _this.setAccessToken(xhr, data);
				 _this.openfirst(data);
				},
		});
	
	};

	
	this.getdataserver=function(parent, data, variable) {
      
        var t = _this.route('getpath', parent, variable);
		  var Accept='application/json';
		  if(!_this.isUndefined(t.accept)){
			Accept=t.accept;
		  }
		  if(requestnow==1) {
            _this.tryes=_this.tryes+1;
            if(_this.tryes>3) {
                requestnow=0;
            }
            setTimeout(function() { _this.getdataserver(parent, data, variable); }, 2000);        
		  }else {           
            requestnow=1;
				
            t = _this.route('getpath', parent, variable);
           
            if (_this.isUndefined(data)) {
                data = '';
            }
			  var header="";           
               
               lastrequest=parent;

               lastrequestdata=data;

               lastrequestvariable=variable;
               
               header = {Authorization:window.localStorage.getItem("access_token"), 'Accept':Accept, 'X-Requested-With':'XMLHttpRequest'};
			   
				myApp.showIndicator();

            var xhr = $$.ajax({
                method: t.method,
                url: serverpath+t.path,
                crossDomain: true,
					 dataType: 'json',
                headers: header,
                contentType: 'application/x-www-form-urlencoded', // 'application/json',
                data: data,
				error: function (xhr) {
				   showlog('error - '+t.path);
               showlog(xhr);
					myApp.hideIndicator();
					requestnow=0;
					var msg;
					
					try{	
					msg=JSON.parse(decodeURI(xhr.responseText));
					}catch(e){
					msg='';	
					}
					vicFunc.setAccessToken(xhr, msg);
					if(!(xhr.status===500 || xhr.status===401 || xhr.status===400 || xhr.status===0) ) {
                    vicFunc.setAccessToken(xhr, msg);
               }else{
                     window.localStorage.clear();
                     myApp.closePanel();
                     _this.openInfoPopup(lang.serveer_disconnect);
						   mainView.router.loadPage("index.html");					  
					}

					var responseData ='';
               /* if(xhr.status==200) {

                    
                        if(xhr.responseText!=='') {

                           responseData = JSON.parse(xhr.responseText);
						   
                         }

                        _this.route('setdata',parent,responseData);
                    }else */
					if(xhr.status==422) {

                        msg=JSON.parse(decodeURI(xhr.responseText));

                        var html='';

                        for (var i in msg) {
									if (msg.hasOwnProperty(i)) {
                            html=html+'<br>'+msg[i][0];
									}
                        }

                        $$('#entererror').html(html);

                        myApp.popup('.popup-wrongpass');
                    }else if(xhr.status>=400 && parent=='activationuserlogin') {
							   responseData ='';
                        if(xhr.responseText!=='') {
                           responseData = JSON.parse(xhr.responseText);						   
                         }
							 vicFunc.route('setdata',parent,responseData);
							 myApp.hideIndicator();
							}
							
                    if(xhr.status>=400 && parent=='cities_search') {
                        myApp.hideIndicator();
                        cityIsSearched=0;
                    }
                },
              success: function (data) {
                showlog('success - '+t.path);	
				    myApp.hideIndicator();
					 requestnow=0;
                vicFunc.setAccessToken(xhr, data);					 
                vicFunc.route('setdata',parent,data);
                }
            });
            if(t.method=='DELETE') {
               requestnow=0;
            }
        }
    };
this.setAccessToken = function(xhr, responseData){
	if(!vicFunc.isUndefined(responseData.access_token)) {						
		window.localStorage.setItem("access_token", 'Bearer '+responseData.access_token);
    }else {
		window.localStorage.setItem("access_token", xhr.getResponseHeader('Authorization'));
    }  
};
this.ticketThemeView = function (responseData){
	var html='';
	var messages=responseData.messages;
	  for (var theme in messages) {
		if (messages.hasOwnProperty(theme)) {
		var className='';
		if(messages[theme].operator_id !== null){ className='operator'; }
		if(messages[theme].user_id !== null){ className='user'; }		
		html=html+'<div class="baloon-block '+className+'" id="baloon'+messages[theme].id+'">'+
		'<div class="messages">'+messages[theme].message+'</div>'+
		'<div class="time">'+_this.getmyDateFormat(messages[theme].created_at)+'</div>'+
		'</div>';
		  }
		}
	$$('#themeid').val(responseData.id);
	 $$('#message-container').html(html);
	 $$('#theme-screen').hide();
	 $$('#messages-screen').show();
	 var sh=0;
	 $$('#message-container').children().each(function(indx, element){
		sh=sh+$$(element).outerHeight();
		} ); 
	$$('#message-container').scrollTop(sh); 
	$$('.theme-tab').removeClass('active');
	$$('.messages-tab').addClass('active');	
};

/* get city */
this.createDivCity = function (responseData){
	var html='';
	for (var key in responseData.items){
	 if (responseData.items.hasOwnProperty(key)) {
	 html=html+'<div class="cityBlock" id="cityID'+responseData.items[key].id+'">'+
		'<div class="namecity" id="namecity'+responseData.items[key].id+'">'+responseData.items[key].CityName+'</div>'+
		'<div class="nameregion" id="nameregion'+responseData.items[key].id+'">'+responseData.items[key].RegionName+'</div>'+
		'</div>';
		if(_this.activeCitySearch.val() == responseData.items[key].CityName){
			var tid=_this.activeCitySearch.attr('id');
			$$('#'+tid+'_id').val(responseData.items[key].id);
			$$('#'+tid).val(responseData.items[key].CityName);
			$$('.region_'+tid).text(responseData.items[key].RegionName);
			$$('#cities').css({display: 'none', zIndex: '-1'}); 
		}
	 }	
	}
	$$('#cities').html(html);
	var coords=_this.activeCitySearch[0].getBoundingClientRect();
	//showlog(coords);
	$$('.cityBlock').click(function(){
		var tid=_this.activeCitySearch.attr('id');
		var idcity=$$(this).attr('id').replace('cityID', "");
		var name=$$('#namecity'+idcity).text();
		var region=$$('#nameregion'+idcity).text();
		$$('#'+tid+'_id').val(idcity);
		$$('#'+tid).val(name);
		$$('.region_'+tid).text(region);
		$$('#cities').css({display: 'none', zIndex: '-1'}); 
		});
	 $$('#cities').css({left: coords.left + "px", top: coords.bottom + "px", display: 'block', zIndex: '12510'}); 
};

this.ticketThemeCreate = function (responseData){
	var html='';
	var className= new Array('close', 'new', 'answered');
	  for (var theme in responseData) {
		if (responseData.hasOwnProperty(theme)) {
			count_message=0;
			if(!_this.isUndefined(responseData[theme].messages_count)){count_message=responseData[theme].messages_count;}
			html=html+'<div class="theme-block" id="theme'+responseData[theme].id+'">'+
		'<div class="themeico '+className[responseData[theme].state_id]+'">'+count_message+'</div><div class="themesubject">'+responseData[theme].subject.substr(0,28)+'<span>'+responseData[theme].subject.substr(0,30)+'</span></div>'+
		'</div>';
	  }
	  }
	 $$('#theme-screen').html(html);
	 $$('#messages-screen').hide();
	 $$('#theme-screen').show();
	$$('.messages-tab').removeClass('active');
	$$('.theme-tab').addClass('active');
	
	  $$('.theme-block').on('click', function () {
	     var theme_id=$$(this).attr('id').replace('theme', '');		
		 if(theme_id!==undefined){			
		 _this.getdataserver('ticket_view','', theme_id);
		 }
		});
};
 this.openInfoPopup = function (name) { 
  $$('#msg-info-popup').html(name);
  myApp.popup('.popup-info');
 };
this.createMap = function (responseData) {
   // var rdata=responseData;
    if(responseData!==undefined){
  ymaps.ready(function () {
	var ismapcreate=_this.createYaMap();
	vicFunc.getSelfPosition();
   if(ismapcreate===false){
	  myMap.geoObjects.removeAll();
    	myMap.geoObjects.remove(routeApp);
	}
	if(ismapcreate!==null){
      var myGeoObject = new ymaps.GeoObject({options:{fillColor:'00000000'}});
      myMap.geoObjects.add(myGeoObject);
      var myObjectManager = new ymaps.ObjectManager({ clusterize: true });

myObjectManager.objects.options.set({
    preset: 'islands#darkOrangeCircleDotIconWithCaption',
    hasBalloon: false,
    zIndex: 500
});
		
    if(subscriptionsfrom!==''){
	     routeApp=new ymaps.route([subscriptionsfrom, subscriptionsto]);           
           routeApp.then(
                function (route) {
                   route.options.set("mapStateAutoApply", true);
				    myMap.geoObjects.add(route);
                   
                  },
                function (error) {
                   showlog(error.message);
                }
            );
        }

      var myObjects = [];
    if(responseData.length>0){        
        for (var i = 0, l = responseData.length; i < l; i++) {
            myObjects.push({
                type: 'Feature',
                id: responseData[i].orders_id,
                geometry: {
                    type: 'Point',
                    coordinates: [responseData[i].Latitude, responseData[i].Longitude]
                }
            });
        }
    }
    myObjectManager.options.set('geoObjectOpenBalloonOnClick', false);
	myObjectManager.clusters.options.set({
    preset: 'islands#invertedDarkOrangeClusterIcons',
    hasBalloon: false,
    zIndex: 500
});	

	
  myObjectManager.clusters.events.add('click', function (e) {
	var objects =  e.get('target')._overlaysById[e.get('objectId')]._data.features;
	var objArr=[];
	for(var i in objects){
	 if(objects.hasOwnProperty(i)){
	objArr.push(objects[i].id);
	 }
	}
    vicFunc.getdataserver('map_detail', {orders_ids:objArr} );    
});
  myObjectManager.objects.events.add('click', function (e) {
    vicFunc.getdataserver('map_detail', {orders_ids:[e.get('objectId')]} ); 
});  
        myObjectManager.add(myObjects);        
        myMap.geoObjects.add(myObjectManager);  
	}
	});
	 }
if(userProfileData===false){ 
     vicFunc.getdataserver('firstperson','');
   }
 }; 

/*change dates*/
    this.getmyDateFormat = function (str_date) {
		var time = new Date(str_date);
		var month=lang.month;
		formateddate=time.getDate()+ ' '+month[time.getMonth()];
		return formateddate;
	};
/*add cars in array */
this.savecardata=function(responseData){
	var car=myApp.formToJSON($$('form#add-car'));
	car.id=responseData.id;
	car.enabled=1;
	userProfileData.cars.push(car);
	};	
	
/*show cars */
 this.carsshow = function(){
	showlog(userProfileData.cars); 
   if(_this.isUndefined(userProfileData.cars)){
       
     vicFunc.getdataserver('getmycars','');
   }else{
        var carList = [];
       carList = userProfileData.cars;

    var carHtml = '';
    var enablesname=new Array(lang.disabled, lang.enabled);
	 var classname=new Array('disabled-car', '');
    for (var car in carList) {
		if(carList.hasOwnProperty(car)){
        carHtml = carHtml + '<div class="carblock ' + classname[ carList[car].enabled ] + '" id="car' + carList[car].id + '">'+
        '<div class="header">'+
         '<div class="carNumber car_code">' + carList[car].car_code + '</div>'+
         '<div class="region region_code">' + carList[car].region_code + '</div>'+
         '<div class="status"><div class="label" id="enabled_cars'+carList[car].id+'">' + enablesname[ carList[car].enabled ] +'</div>'+
          '<div class="item-input">' +
                '<label class="label-switch"><input type="checkbox" count="'+car+'" class="enabled_cars" name="' + carList[car].id + '" ';
                if( carList[car].enabled ==1){carHtml = carHtml +   'checked="checked"';}
                 carHtml = carHtml + '><div class="checkbox"></div></label>' +     
         '</div></div>' +
        '</div>'+
        '<div class="body">'+ 
          '<div class="bodyType-name type-name">'+lang.car_type+'</div><div class="bodyType type-value car_type_id">' + car_types[carList[car].car_type_id] + '</div>'+ 
        '</div>'  +
        '<div class="body block2">'+ 
         '<div><div class="tonnage-name type-name">'+lang.tonnage+'</div><div class="tonnage type-value carrying">' + carList[car].carrying + '</div></div>'+
         '<div><div class="bodyVolume-name type-name">'+lang.body_volume+'</div><div class="bodyVolume type-value volume">' + carList[car].volume + '</div></div>'+
          '</div>'+
           '<div class="body block2">'+
                 '<div><div class="length-name type-name">'+lang.length+'</div><div class="carlength type-value length">' + carList[car].length + '</div></div>'+
                 '<div><div class="width-name type-name">'+lang.width+'</div><div class="carwidth type-value width">' + carList[car].width + '</div></div>'+
                 '<div><div class="height-name type-name">'+lang.height+'</div><div class="carheight type-value height">' + carList[car].height + '</div></div>'+
                 '</div>'+
         '<div class="body">'+
                 '<div class="bodyType-name type-name">'+lang.pts_number+'</div><div class="bodyType type-value pts_number">' + carList[car].pts_number + '</div>'+
          '</div>'+            
                 '<div class="end">'+
                 '<div class="change"><a class="changecar" changeid="'+carList[car].id+'">'+lang.change+'</a></div>'+
                 '<div class="delete"><a class="deletecar" deleteid="'+carList[car].id+'">'+lang.deletes+'</a></div>'+
                '</div>' +
        '</div>';
	 }
    }
    $$('#carsblocks').html(carHtml);

	$$('.enabled_cars').on('change', function () {
       var enabled_id=$$(this).attr('name');
		 var count=$$(this).attr('count');
       if($$(this).prop('checked')===true){
         $$('#enabled_cars'+enabled_id).text(enablesname[1]);
			userProfileData.cars[count].enabled=1;			
			$$('#car' + enabled_id ).removeClass('disabled-car');
         vicFunc.getdataserver('enable_cars', {enabled: true}, enabled_id);
       }else{
			$$('#car' + enabled_id ).addClass('disabled-car');
		  userProfileData.cars[count].enabled=0;
        $$('#enabled_cars'+enabled_id).text(enablesname[0]);
        vicFunc.getdataserver('enable_cars', {}, enabled_id);        
       }
        });
    
	$$('.changecar').on('click', function () {
	 var car_id=$$(this).attr('changeid');
     vicFunc.getdataserver('get_car_edit', {}, car_id);      
    });
	
    $$('.deletecar').on('click', function () {
	 var car_id=$$(this).attr('deleteid');
     vicFunc.getdataserver('car_delete', {}, car_id);
	 	$$('#car'+car_id).remove();
    });
	
		var htmloption="";
	 for (var type in car_types) {
		 if(car_types[type]!==''){
		htmloption=htmloption+'<option value="'+type+'">'+car_types[type]+'</option>';
		 }
	 }
 

	$$('.bodyType_option').html(htmloption);
   }
 };
 
 this.mapRoutesDetail= function(responseData){
	map_Routes_Detail=responseData;
	mainView.router.loadPage('pages/map_route.html');

 };
 /*change car data*/
 this.changeCar=function(responseData){
	var cars_fields=new Array('car_code', 'region_code', 'pts_number', 'carrying', 'car_type_id', 'volume', 'length', 'width', 'height');
	 for (var n in cars_fields) {
		if(cars_fields.hasOwnProperty(n)){
		$$('.popup-editcars #'+cars_fields[n]).val(responseData[cars_fields[n]]);	
		}
	 }
	myApp.popup('.popup-editcars'); 

     
};
this.setKMonsubscribes= function(route, mynewroute){
 var routeLength = Math.round(route.getLength()/10)/100;
	for(var t in mynewroute){
		if(mynewroute.hasOwnProperty(t)){
		if(mynewroute[t]._value==route){
		$$('#longcount'+t).html(routeLength+' км');    
     }
	 }
   }	
};
this.showSubscribe = function(){
           var html='';
     new ymaps.Map("mapdummy", {
        center: [55.751574, 37.573856],
        zoom: 9
        });
      var mynewroute=[];
  	for (var i in userProfileData.subscriptions) {
		if(userProfileData.subscriptions.hasOwnProperty(i)){
     mynewroute[userProfileData.subscriptions[i].id]=new ymaps.route([userProfileData.subscriptions[i].city_from.CityName, userProfileData.subscriptions[i].city_to.CityName]);
      mynewroute[userProfileData.subscriptions[i].id].then(
       function (route) {			
         _this.setKMonsubscribes(route, mynewroute);
       });
        html=html+'<div class="subscribeblock" id="subsc'+userProfileData.subscriptions[i].id+'">'+
				'<div class="begin">'+
					'<span class="icon_map_routes"></span>'+
					'<div class="address-name">'+
						'<div class="city">'+userProfileData.subscriptions[i].city_from.CityName+'</div>'+
						'<div class="region">'+userProfileData.subscriptions[i].city_from.RegionName+'</div>'+
					'</div>'+
					'<div class="address-name">'+
						'<div class="city">'+userProfileData.subscriptions[i].city_to.CityName+'</div>'+
						'<div class="region">'+userProfileData.subscriptions[i].city_to.RegionName+'</div>'+
					'</div>'+
				'</div>'+
				'<div class="itog">'+
					'<div class="long"><span class="ico icon-dist"></span><span id="longcount'+userProfileData.subscriptions[i].id+'"> </span></div>'+
					'<div class="compass showinmap" to="'+userProfileData.subscriptions[i].city_to.CityName+'" from="'+userProfileData.subscriptions[i].city_from.CityName+'"><span class="ico icon-compass"></span></div>'+
				'</div>'+
				'<div class="stat">'+
					'<div class="label" id="enabled'+userProfileData.subscriptions[i].id+'">';
					var check='';
              if(userProfileData.subscriptions[i].enabled==1){html=html+lang.enabled; check='checked="checked"';
                }else{html=html+lang.disabled;}
                 html=html+'</div>'+
					'<label class="label-switch"><input type="checkbox" class="enabled_subscribe" '+check+' i="'+i+'" name="'+userProfileData.subscriptions[i].id+'"><div class="checkbox"></div></label>'+
				'</div>'+
				'<div class="button-container">'+
					'<div class="delete_subscribe btn-lite"  i="'+i+'" deleteid="'+userProfileData.subscriptions[i].id+'">'+lang.deletes+'</div>'+
				'</div>'+
		 '</div>';
        }
	}
   $$('#subscribeblocks').html(html);
   $$('.showinmap').on('click', function () {
        subscriptionsfrom=$$(this).attr('from');
        subscriptionsto=$$(this).attr('to');
         mainView.router.loadPage('pages/map.html');
        });
     $$('.delete_subscribe').on('click', function () {
          var delete_id=$$(this).attr('deleteid');
          var i=$$(this).attr('i');
          vicFunc.getdataserver('delete_subscriptions', {}, delete_id);
          $$('#subsc'+delete_id).remove();
          userProfileData.subscriptions.splice(i,1);
        });
     $$('.enabled_subscribe').on('change', function () {
       var enabled_id=$$(this).attr('name');
       var i=$$(this).attr('i');
       if($$(this).prop('checked')===true){
        userProfileData.subscriptions[i].enabled=1;
        $$('#enabled'+enabled_id).text(lang.enabled);
        vicFunc.getdataserver('enable_subscriptions', {enabled: true}, enabled_id);
       }else{
        userProfileData.subscriptions[i].enabled=0;
        $$('#enabled'+enabled_id).text(lang.disabled);
        vicFunc.getdataserver('enable_subscriptions', {}, enabled_id);        
       }
        });

    
     $$('.addsubscribe').on('click', function () {	
      myApp.popup('.popup-addsubscribe');            
    });
   };
this.saveSubscribe=function(){
	 var data={city_from_id: $$('#begin_id').val(), city_to_id: $$('#end_id').val()};
         vicFunc.getdataserver('create_subscriptions', data);
          myApp.closeModal('.popup-addsubscribe');
	};		 
 /*add subscibe after save*/
 this.addSubscriptions= function(responseData){
	var html= $$('#subscribeblocks').html();
	  html=html+'<div class="subscribeblock" id="subsc'+responseData.id+'">'+
				'<div class="begin">'+
					'<span class="icon_map_routes"></span>'+
					'<div class="address-name">'+
						'<div class="city">'+responseData.city_from_city+'</div>'+
						'<div class="region">'+responseData.city_from_region+'</div>'+
					'</div>'+
					'<div class="address-name">'+
						'<div class="city">'+responseData.city_to_city+'</div>'+
						'<div class="region">'+responseData.city_to_region+'</div>'+
					'</div>'+
				'</div>'+
				'<div class="itog">'+
					'<div class="long"><span class="ico icon-dist"></span><span id="longcount'+responseData.id+'"> </span></div>'+
					'<div class="compass showinmap" to="'+responseData.city_to_city+'" from="'+responseData.city_from_city+'"><span class="ico icon-compass"></span></div>'+
				'</div>'+
				'<div class="stat">'+
					'<div class="label" id="enabled'+responseData.id+'">';
             html=html+lang.enabled; var check='checked="checked"';            
                 html=html+'</div>'+
					'<label class="label-switch"><input type="checkbox" class="enabled_subscribe" '+check+' name="'+responseData.id+'"><div class="checkbox"></div></label>'+
				'</div>'+
				'<div class="button-container">'+
					'<div class="delete_subscribe btn-lite" deleteid="'+responseData.id+'">'+lang.deletes+'</div>'+
				'</div>'+
		 '</div>';
  $$('#subscribeblocks').html(html);
   $$('.showinmap').on('click', function () {
        subscriptionsfrom=$$(this).attr('from');
        subscriptionsto=$$(this).attr('to');
         mainView.router.loadPage('pages/map.html');

        });
   new ymaps.route([responseData.city_from_city, responseData.city_to_city]).then(
    function (route) {
    var routeLength = route.getLength();
     $$('#longcount'+responseData.id).html(routeLength+' км');    
   }
  );
 };
 this.isRouteInSubscriptions=function(startpoint, endpoint){
	for (var v in userProfileData.subscriptions) {
     if(userProfileData.subscriptions[v].city_from.CityName==startpoint && userProfileData.subscriptions[v].city_to.CityName==endpoint ){
       return true;  
     }
   }
    return false;  	  
 };
/*show routes data*/
 this.routesshow = function(responseData, parent){
	var blockclass='';
		var route_visual_info='';
	if(parent==='#routesblocks'){
		 routesList=responseData;
	}else {
  routesList=responseData.data;
	}
  var routeHtml = '';
  
  for (var route in routesList) {
	if(routesList.hasOwnProperty(route)){
	if(parent==='#routesblocks'){
		blockclass=routesList[route].carrier_state.class;
	route_visual_info=routesList[route].carrier_state.title;
	}else{
		 if(_this.isRouteInSubscriptions(routesList[route].startpoint[0], routesList[route].endpoint[0])){
			route_visual_info='<a><i class="ico ico-star-yellow"></i></a>'; 
		 }else{
			route_visual_info='<a><i class="ico menu-ico-star"></i></a>'; 	
		 }
	}	
	
    price=Math.round(routesList[route].carrier_rate/routesList[route].route_length);
    routeHtml = routeHtml + '<div class="routeblock '+blockclass+'" n="'+route+'" id="' + routesList[route].id + '">'+
    '<div class="header">'+
    '<div class="item-media"><span class="ico icon-dates"></span></div>'+
    '<div class="item-title">' +  vicFunc.getmyDateFormat(routesList[route].loading) + '-' +vicFunc.getmyDateFormat(routesList[route].unloading) + '</div>';
    if(routesList[route].status !==null && !_this.isUndefined(routesList[route].status)){
	 routeHtml = routeHtml+ '<div class="item-status">' + routesList[route].status + '</div>';
	}
   routeHtml = routeHtml  + '<p class="zvezd">'+route_visual_info+'</p>'+'</div>'+
    '<div class="begin">'+
     '<span class="icon_map_routes"></span>'+
     '<div class="address-name"><div class="city">' + routesList[route].startpoint[0] + '</div>'+
     '<div class="region">' + routesList[route].startpoint[1] + '</div>'+

    '</div>'+
    '<div class="address-name"><div class="city">' + routesList[route].endpoint[0] + '</div>'+
    '<div class="region">' + routesList[route].endpoint[1] + '</div>'+
    '</div></div>'+
	 '<div class="itog">';
	if(routesList[route].carrier_rate!==null && routesList[route].carrier_rate>0){
    routeHtml = routeHtml+ '<div class="cost"><span class="ico icon-rub"></span> ' + routesList[route].carrier_rate + ' '+lang.rub+'</div>';
	}
	if(price!==null && price>0 && price!=Infinity){
   routeHtml = routeHtml + '<div class="price">' + price + ' '+lang.rub+'/'+lang.km+'</div>';
	}
		if(routesList[route].route_length!==null && routesList[route].route_length > 0){
   routeHtml = routeHtml + '<div class="long"><span class="ico icon-dist"></span>' + routesList[route].route_length + ' '+lang.km+'</div>';
		}
  routeHtml = routeHtml  + '</div>'+
    '</div>';
	}
    }
	if(routeHtml===''){
	routeHtml='<div class="routeblock"><div class="nodata">'+lang.routes_not_found+'</div></div>';
	}
	//routesshow
	if(parent=='#listblocks' && search==1){
	 pagelistload=responseData.current_page+1;
	 last_page=responseData.last_page;
 	 routeHtml=$$(parent).html()+routeHtml;
	 loading=0;
	}
    $$(parent).html(routeHtml);
	 $$('.routeblock').on('click', function () {
		var n =$$(this).attr('n'); 
		var data=new Array(routesList[n]);
	  _this.mapRoutesDetail(data);
	 });
	 
  }; 


this.login_first_error = function(responseData){
    if(responseData.status==422){
    msg=JSON.parse(decodeURI(responseData.responseText));            
    var html='';
    for (var i in msg) {
		if(msg.hasOwnProperty(i)){
      html=html+'<br>'+msg[i][0];
     }
	 }
    $$('#entererror').html(html);
    myApp.popup('.popup-wrongpass');
    }
    if(responseData.status==401){
     msg=JSON.parse(decodeURI(responseData.responseText));
     if(msg.message=='auth.activation'){
      $$('#sendmesms').on('click', function () {
       data={resend_token: msg.resend_token};
		 window.localStorage.setItem("resend_token", msg.resend_token);
       vicFunc.getdataserver('activationuserlogin',data);
       myApp.popup('.popup-registrationsms');
      });
      $$('.popup-sendregistrationsms .close-popup').on('click', function () {
      
       mainView.router.loadPage('index.html'); 
      });        
      myApp.popup('.popup-sendregistrationsms');        
      }        
    }
 };

this.setUserProfile = function(responseData){
	userProfileData=responseData;
	$$('.person-block #tel').html(userProfileData.phone);
    $$('.person-block #group').html(window.localStorage.getItem("role_label"));
	if(userProfileData.data!==null){
	$$('.person-block #bank_account').html(userProfileData.data.bank_account);
	$$('.person-block #bank_bik').html(userProfileData.data.bank_bik);
	$$('.person-block #bank_korr').html(userProfileData.data.bank_korr);
	$$('.person-block #bank_name').html(userProfileData.data.bank_name);
	$$('.person-block #cont_email').html(userProfileData.data.cont_email);
	$$('.person-block #cont_name').html(userProfileData.data.cont_name);
	$$('.person-block #cont_phone').html(userProfileData.data.cont_phone);
	$$('.person-block #org_email').html(userProfileData.data.org_email);
	$$('.person-block #org_head_name').html(userProfileData.data.org_head_name);
	$$('.person-block #org_inn').html(userProfileData.data.org_inn);
	$$('.person-block #org_kpp').html(userProfileData.data.org_kpp);
	$$('.person-block #org_name').html(userProfileData.data.org_name);
	$$('.person-block #org_phone').html(userProfileData.data.org_phone);
	$$('.person-block #org_ogrn').html(userProfileData.data.org_ogrn);
	$$('.person-block #org_post_address').html(userProfileData.data.org_post_address);
	}
	
};
this.setUserProfileEdit = function(){
	$$('.person-block-edit #phone').val(userProfileData.phone);
   
	$$('.person-block-edit #name').val(userProfileData.name);
	$$('.person-block-edit #password').val(password);
	$$('.person-block-edit #password_confirmation').val(password);
	if(userProfileData.data!==null){
	$$('.person-block-edit #bank_account').val(userProfileData.data.bank_account);
	$$('.person-block-edit #bank_bik').val(userProfileData.data.bank_bik);
	$$('.person-block-edit #bank_korr').val(userProfileData.data.bank_korr);
	$$('.person-block-edit #bank_name').val(userProfileData.data.bank_name);
	$$('.person-block-edit #cont_email').val(userProfileData.data.cont_email);
	$$('.person-block-edit #cont_name').val(userProfileData.data.cont_name);
	$$('.person-block-edit #cont_phone').val(userProfileData.data.cont_phone);
	$$('.person-block-edit #org_email').val(userProfileData.data.org_email);
	$$('.person-block-edit #org_head_name').val(userProfileData.data.org_head_name);
	$$('.person-block-edit #org_inn').val(userProfileData.data.org_inn);
	$$('.person-block-edit #org_kpp').val(userProfileData.data.org_kpp);
	$$('.person-block-edit #org_name').val(userProfileData.data.org_name);
	$$('.person-block-edit #org_phone').val(userProfileData.data.org_phone);
	$$('.person-block-edit #org_ogrn').val(userProfileData.data.org_ogrn);
	$$('.person-block-edit #org_post_address').val(userProfileData.data.org_post_address);
	}
	
	
	if(vicFunc.isFullRole()){$$('.forUr').show();}else{$$('.forUr').hide();}

};
this.ticket_message = function(){  
		var theme=$$('#themeid').val();	
		 if(theme!==undefined){			
		 vicFunc.getdataserver('ticket_view','', theme);
		 $$('#themenewmsg').val('');	
	 }
  };
  
this.isFullRole = function(){
   return  (window.localStorage.getItem("role_id")==7); 
 };  
/*open page in first time*/
this.openfirst = function(responseData){
	userProfileData=responseData;
	$$('.personal_name').text(responseData.user.name);
	$$('.personal_type').text(responseData.user.role_label);
     window.localStorage.setItem("name", responseData.user.name);
     window.localStorage.setItem("role_label", responseData.user.role_label);
      window.localStorage.setItem("role_id", responseData.user.role_id);
		 window.localStorage.setItem("user_id", responseData.user.id); 
	mainView.router.loadPage('pages/map.html');  
	$$('#exit_icon').on('click', function () {		
      window.localStorage.clear();
	 myApp.closePanel();
	 mainView.router.loadPage("index.html");
	});
	
	$$('#menumap').on('click', function () {		
	 myApp.closeModal('.picker-modal.modal-in');
	});
	$$('#menulist').on('click', function () {
	 myApp.closeModal('.picker-modal.modal-in');
	});
	if(vicFunc.isFullRole()){
	$$('#menuroutes').on('click', function () {	
	   myApp.closeModal('.picker-modal.modal-in');
	});
	$$('#menutiket').on('click', function () {
	
	   myApp.closeModal('.picker-modal.modal-in');
	});
	$$('#menusubscribe').on('click', function () {
	
	   myApp.closeModal('.picker-modal.modal-in');
	});
	$$('#menucars').on('click', function () {
	
	   myApp.closeModal('.picker-modal.modal-in');
	});
	 if(!_this.isUndefined(responseData.cars) && responseData.cars.length===0){
	myApp.pickerModal(
    '<div class="picker-modal addcars-modal">' +
      '<div class="picker-modal-inner">' +
        '<div class="content-block">' +
          '<p>'+lang.usecars+'</p>' +
		  '<div class="button-container"><a id="addcar">'+lang.adds+'</a></div>'+
        '</div>' +
      '</div>' +
    '</div>'
  );
	$$('#addcar').on('click', function () {
	    myApp.popup('.popup-addcars');
		 myApp.closeModal('.picker-modal.modal-in');
	});
	}
	 $$('#menuroutes').show();
	 $$('#menutiket').show();
	 $$('#menusubscribe').show();
	 $$('#menucars').show();	
	}else{
	 $$('#menuroutes').hide();
	 $$('#menutiket').hide();
	 $$('#menusubscribe').hide();
	 $$('#menucars').hide();		
	}
	$$('#menuperson').on('click', function () {
	   myApp.closeModal('.picker-modal.modal-in');
	});
   window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://victrack.ru:6001',
    auth:
    {
        headers:
        {
            'Authorization': window.localStorage.getItem("access_token")
        }
    }
});
	console.log(window.localStorage.getItem("user_id"));
if(window.localStorage.getItem("user_id")!==null && ! vicFunc.isUndefined(window.localStorage.getItem("user_id"))){

	window.Echo.private('App.User.'+window.localStorage.getItem("user_id"))
    .listen('Operator.AcceptRateOffer', function(e) {
		vicFunc.notify(e.text, 1);
		showlog(e);
    })
	.listen('Operator.RejectRateOffer', function(e) {
		vicFunc.notify(e.text, 2);
		showlog(e);
    })
	.listen('Operator.AcceptRouteRequest', function(e) {
		vicFunc.notify(e.text, 1);
		showlog(e);
    })
	.listen('Operator.RejectRouteRequest', function(e) {
		vicFunc.notify(e.text,2);
		showlog(e);
    })
	.listen('Operator.PaymentWaitingState', function(e) {
		vicFunc.notify(e.text,3);
		showlog(e);
    })
	.listen('Operator.UserConfirmed', function(e) {
		vicFunc.notify(e.text,1);
		showlog(e);
    })
	.listen('Operator.Message', function(e) {
		vicFunc.notify(e.text,4);
		showlog(e);
    })
	.listen('Operator.TicketClosed', function(e) {
		vicFunc.notify(e.text);
		showlog(e);
    });
}
};
this.activationuserlogin=function(responseData){
	if(responseData.message=="auth.timeout"){
		var timeout=responseData.timeout*1100;	
		setTimeout(function(){			
		  data={resend_token: window.localStorage.getItem("resend_token")};
        vicFunc.getdataserver('activationuserlogin',data);
		 }, timeout); 
	  }
	};	

this.getSelfPosition=function(){
	if(myMap!==false){
   navigator.geolocation.getCurrentPosition(geolocationSuccess);
	/*ymaps.geolocation.get().then(function (res) {
   lat=res.geoObjects.position[0];
   lng=res.geoObjects.position[1];
	myMap.setCenter(lat, lng, 10);	
	myMap.geoObjects.remove(selfPosition);
   selfPosition = new ymaps.GeoObject({
        geometry: {
          type: "Point",
		  preset:'islands#blueCircleDotIcon',
          coordinates: [lat, lng] 
       }
       });
		myMap.geoObjects.add(selfPosition); 
		});*/
	}
};
this.createYaMap=function(){

   if(myMap===false || $$('#map').html()===''){
        myMap = new ymaps.Map("map", {
            center: [55.7522200, 37.6155600],
            zoom: 9,
            controls: ['smallMapDefaultSet']
        });

		return true;  
     }else{
		return false;	
	  }

return null;	
};


this.saveQuestionClick=function(){
if(openRoute!==0 && $$('#questionforroute').val()!==''){
       var theme=openRoute;
       var msg=$$('#questionforroute').val();
       var data ={subject:msg};
        vicFunc.getdataserver('ticket_order', data, theme);       
    }    
};

this.saveCarClick=function(){
	data =  $$.serializeObject(myApp.formToJSON($$('form#edit-car')));
	
	 for (var n in cars_fields) {
		if(cars_fields.hasOwnProperty(n)){
		$$('#car'+responseData.id+' .'+cars_fields[n]).html($$('.popup-editcars #'+cars_fields[n]).val());
		}
	 }	
	$$('#car'+responseData.id+' .car_type_id').html( car_types[$$('.popup-editcars #car_type_id').val()] );
	
	for (var s in userProfileData.cars) {
		if(userProfileData.cars.hasOwnProperty(s)){
			if(userProfileData.cars[s].id===responseData.id){
				 for (var p in cars_fields) {
					if(cars_fields.hasOwnProperty(p)){
						userProfileData.cars[s][cars_fields[p]]=$$('.popup-editcars #'+cars_fields[p]).val();                    
					}
				 }	
			}		
		}	
	}
     vicFunc.getdataserver('car_edit', data, responseData.id);
     myApp.closeModal('.popup-editcars');
	 };


this.saveNewCarClick=function(){
	data =  $$.serializeObject(myApp.formToJSON($$('form#add-car')));
	vicFunc.getdataserver('car_create', data);
    myApp.closeModal('.popup-addcars');
  };     
this.dispetcherClick=function(){
        myApp.popup('.popup-dispetcher');
};
this.reloadClick=function(){
	subscriptionsfrom='';
   vicFunc.getdataserver('map_points','');
	};

this.closeActionClick=function(){
        myApp.closeModal('.popup-action');
};
this.subscribeActionClick=function(){
   if(openRoute!==0){
        vicFunc.getdataserver('addtosubscriptions','', openRoute);
    }
};
this.getRouteActionClick=function(){
   if(openRoute!==0){
      vicFunc.getdataserver('routerequest','', openRoute);
   }
   myApp.closeModal('.popup-action');
}; 
this.rateActionClick=function(){
	 if(openRoute!==0){
       myApp.popup('.popup-rateorder');
    }	
};
this.saveRateClick=function(){
  if(openRoute!==0){
    var per_km=0;
    if($$('#per_km').prop('checked')===true){ per_km=1;}
    var data={per_km: per_km, rate: $$('#ratecount').val()};
   /* showlog(data);*/
    vicFunc.getdataserver('rateoffer',data, openRoute);
    }
    myApp.closeModal('.popup-rateorder');
    myApp.closeModal('.popup-action');
};
this.callActionClick=function(){
    if(openRoute!==0){
    vicFunc.getdataserver('callback','', openRoute);
    }
    myApp.closeModal('.popup-action');	
};  
this.questionActionClick=function(){
    if(openRoute!==0){
     myApp.popup('.popup-addticket');
    }
};

this.notify=function(text, type){
  if ($$('.picker-modal.modal-in').length > 0) {
    myApp.closeModal('.picker-modal.modal-in');
  }
  var class_modal="";
  var ico_name="map-ico-routes";
  if(type==1){class_modal="type1";}
  if(type==2){class_modal="type2";}
  if(type==3){class_modal="type3";}
  if(type==4){class_modal="type4"; ico_name='ic_speech_white'}
  myApp.pickerModal(
    '<div class="picker-modal messmod '+class_modal+'">' +
      '<div class="picker-modal-inner">' +
		    '<div class="icoleft"><div><i class="ico '+ico_name+'"></i></div></div>' + 
          '<p class="text">'+text+'</p>' +
			  '<div class="close-right"><a href="#" class="close-picker"><i class="ico ico-close-gray"></i></a></div>' + 
      '</div>' +
    '</div>'
  );
};
this.isUndefined=function(v){
		if(v===undefined){
			return true;
		}
		if(v=='undefined'){
			return true;
		}
		return false;	
	};
}
function showlog(m){
	if(!relise){
   console.log(m);
	}
}
// Initialize app
var myApp = new Framework7({
});
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
   /* dynamicNavbar: true*/
});
function login_click(){
 vicFunc.login($$('#loginPhone').val().replace('+7', 8),$$('#loginPassword').val()); 
}
// Logins
$$(document).on('deviceready', function () {    
    if(vicFunc.isLogin()){
    var dataforopen=[];
    dataforopen.user={name:'',role_label:''};
    dataforopen.user.name= window.localStorage.getItem("name");
    dataforopen.user.role_label= window.localStorage.getItem("role_label");
    dataforopen.user.role_id= window.localStorage.getItem("role_id");
	 dataforopen.user.id=window.localStorage.getItem("user_id"); 
    vicFunc.openfirst(dataforopen);
    }
});

myApp.onPageInit('map', function () {
		ymaps.ready(function () {
				vicFunc.createYaMap();
 });


    vicFunc.getdataserver('map_points','');
    myApp.addView('.view-right', {
        name:'right',
        domCache:true,
    });
    

   if( !vicFunc.isFullRole()){
   $$('#question-action').css('display', 'none');
   $$('#call-action').css('display', 'none');
   $$('#get-route-action').css('display', 'none');
   $$('#rate-action').css('display', 'none');
   $$('#saverate').css('display', 'none');
  }else{
	$$('#question-action').css('display', 'flex');
   $$('#call-action').css('display', 'flex');
   $$('#get-route-action').css('display', 'flex');
   $$('#rate-action').css('display', 'flex');
   $$('#saverate').css('display', 'flex');
  }
  var calendar_options={
    input: '#calendar_date_from',
    dateFormat: 'dd.mm.yyyy',
    closeOnSelect: true,
    monthNames:lang.monthNames,
    monthNamesShort:lang.month,
    dayNames: lang.dayNames,
    dayNamesShort: 	lang.dayNamesShort,
  };
  calendar_options.input='#calendar_date_from';
  myApp.calendar(calendar_options);
  calendar_options.input='#calendar_date_to';
  myApp.calendar(calendar_options);
});

myApp.onPageInit('list', function () {
    vicFunc.getdataserver('list','');
    $$('.infinite-scroll').on('infinite', function () {                   
     if(loading===0 && last_page>=pagelistload){
       loading=1;
       vicFunc.getdataserver('list',{page: pagelistload});                 
     }
   });
});


myApp.onPageInit('routes', function () {vicFunc.getdataserver('orders','');});

myApp.onPageInit('map-routes', function () {
   var html='';
   for (var i in map_Routes_Detail){
    if(map_Routes_Detail.hasOwnProperty(i)){
    var subscribecss='ico-star-white';
    if(vicFunc.isRouteInSubscriptions(map_Routes_Detail[i].startpoint[0], map_Routes_Detail[i].endpoint[0])){
        subscribecss='ico-star-yellow'; 
    }

    var denger='';//'<i class="ico ico-danger-white"></i>';
    var cars='<i class="ico ico-cars-white"></i>';
     var price=Math.round(map_Routes_Detail[i].carrier_rate /map_Routes_Detail[i].route_length);//count price per km
     var publicprice='';
     if(price>0){publicprice=price+'RUB/KM';}
 html = html+'<div class="swiper-slide blok">'+
'<img class="fon" src="images/pages/top_routemodal.jpg" /><div class="head">'+
'<div class="head2">'+
'<p class="zvezd"><a><i class="ico '+subscribecss+'"></i></a></p>'+
'<p class="zvezd"><a>'+denger+'</a><a>'+cars+'</a></p>'+
'</div>'+
'<div class="head3"><p><span class="ico icon-dates"></span><span>'+vicFunc.getmyDateFormat(map_Routes_Detail[i].loading)+'</span> - <span>'+vicFunc.getmyDateFormat(map_Routes_Detail[i].unloading)+'</span></p></div>'+
'<div class="head4"><a class="add_dispatch" name="'+map_Routes_Detail[i].id+'"><img src="images/pages/dispether2.png" /></a></div>'+
'</div>'+
'<div class="mesto">'+
'<span class="icon_map_routes "></span>'+
'<p class="mesto2">'+
'<span class="gorod">'+map_Routes_Detail[i].startpoint[0]+'</span>'+
'<span class="gorod2">'+map_Routes_Detail[i].startpoint[1]+'</span>'+
'</p>'+
'<p class="mesto2">'+
'<span class="gorod">'+map_Routes_Detail[i].endpoint[0]+'</span>'+
'<span class="gorod2">'+map_Routes_Detail[i].endpoint[0]+'</span>'+
'</p>'+
'</div>'+
'<div class="rastoyan">'+
'<p class="mesto3">'+
'<span class="gorod2">'+lang.route_length+'</span>'+
'<span class="gorod">'+map_Routes_Detail[i].route_length+' км</span>'+
'</p>'+
'<p><div class="border showinmap" from="'+map_Routes_Detail[i].startpoint[0]+'" to="'+map_Routes_Detail[i].endpoint[0]+'"><img src="images/pages/ic_explore_blue.svg" /></div></p>'+
'</div>'+
'<div class="cena">'+
'<p class="mesto3">'+
'<span class="gorod2">'+lang.carrier_rate+'</span>'+
'<span class="gorod">'+map_Routes_Detail[i].carrier_rate+' RUB <i>'+publicprice+'</i></span>'+
'</p>'+
'</div>'+
'<div class="podrob">';
var class1=''; var class2='';
if(opendopinfo){class1='podrinfoclose'; class2='active';}
html=html+'<a class="podrinfo '+class1+'" name="'+map_Routes_Detail[i].id+'">'+lang.detail_info+'</a>'+
'<div class="detailinfo'+map_Routes_Detail[i].id+' '+class2+'"><div class="info">'+
'<p class="variant">'+lang.payment_type+'</p>'+
'<p class="variant1"><i>-</i>'+payment_types[map_Routes_Detail[i].payment_type_id]+'</p>'+
'</div>'+
'<div class="gruz">'+
'<p class="variant">'+lang.cargo_type+'</p>'+
'<p class="variant2 ska">'+map_Routes_Detail[i].cargo_type_txt+'</p>'+
'<p class="ves">'+
'<span class="qaz">'+lang.cargo_weight+'</span>'+
'<span class="qaz">'+lang.cargo_volume+'</span>'+
'</p>'+
'<p class="ves">'+
'<span class="qaz2">'+map_Routes_Detail[i].cargo_weight+'</span>'+
'<span class="qaz2">'+map_Routes_Detail[i].cargo_volume+'</span>'+
'</p>'+
'<p class="variant ska">'+lang.clearance+'</p>';
var cargo_length='';
if(map_Routes_Detail[i].cargo_length>0){cargo_length=map_Routes_Detail[i].cargo_length+' м&nbsp;<i>x</i>&nbsp;';}
var cargo_width='';
if(map_Routes_Detail[i].cargo_width>0){cargo_width=map_Routes_Detail[i].cargo_width+' м&nbsp;<i>x</i>&nbsp;';}
var cargo_height='';
if(map_Routes_Detail[i].cargo_height>0){cargo_height=map_Routes_Detail[i].cargo_height+' м';}
html=html+'<p class="variant2">'+cargo_length+cargo_width+cargo_height+'</p>'+
'</div></div></div>';
html=html+'</div>'; 
   }
}
$$('#maproutesblocks .swiper-wrapper').html(html);
$$('.add_dispatch').on('click', function(){
    myApp.popup('.popup-action');
    openRoute=$$(this).attr('name');
    });   
$$('.podrinfo').on('click', function () {
   $$('.detailinfo'+$$(this).attr('name')).toggleClass('active');
   $$(this).toggleClass('podrinfoclose');
   if(opendopinfo){opendopinfo=false;}else{opendopinfo=true;}
  });
$$('.showinmap').on('click', function () {
   subscriptionsfrom=$$(this).attr('from');
   subscriptionsto=$$(this).attr('to');
   mainView.router.loadPage('pages/map.html');
   });   
    
 myApp.swiper('#maproutesblocks .swiper-container', { 
  spaceBetween: 0
  });
});

myApp.onPageInit('person', function () {
    showlog(userProfileData.data);
	if(vicFunc.isUndefined(userProfileData.data)){
        vicFunc.getdataserver('person','');
	}else{
    	vicFunc.setUserProfile(userProfileData, '.person-block');
    }
});

myApp.onPageInit('personedit', function () {
  if(vicFunc.isUndefined(userProfileData.data)){
   mainView.router.loadPage('pages/person.html');	
  }else{	
   vicFunc.setUserProfileEdit();
  }
  $$('#save_user_profile_edit').on('click', function () {
	data =  myApp.formToJSON($$('#edit-profile-form'));
	data.user=userProfileData.id;
	vicFunc.getdataserver('person_edit', data);		 
  });
});

myApp.onPageInit('subscribe', function () {
 showlog(userProfileData.subscriptions);
 if(vicFunc.isUndefined(userProfileData.subscriptions)){
    vicFunc.getdataserver('subscriptions','');
 }else{
    vicFunc.showSubscribe();    
 }
});

myApp.onPageInit('message', function () {
    vicFunc.getdataserver('tickets','');
    $$('.theme-tab').on('click', function () {
      vicFunc.getdataserver('tickets','');
    });
    $$('button.sendMsg').on('click', function () {
        var theme=$$('#themeid').val();
        var msg=$$('#themenewmsg').val();
        if(theme!=='' && msg!==''){
            var data={message:msg};
        vicFunc.getdataserver('ticket_message', data, theme);
        }
    });
});

myApp.onPageInit('cars', function () {
 if(car_types===false){	
    vicFunc.getdataserver('car_types',''); 
 }else{
    vicFunc.carsshow();
 }
 $$('.addcar').on('click', function () {	
    myApp.popup('.popup-addcars');      
 });


});


myApp.onPageInit('registration', function () {
 $$('#reg-form').attr('action', serverpath+'register');
 myApp.closeModal('.login-screen');
 $$('form#reg-form').on('beforeSubmit', function (e) {
  var xhr = e.detail.xhr.requestParameters;
  xhr.headers={'Accept':'application/json', 'X-Requested-With':'XMLHttpRequest'};
  xhr.crossDomain=true;
  xhr.dataType='json';
  xhr.contentType='application/x-www-form-urlencoded';
     console.log(xhr.options);
 });
 $$('form#reg-form').on('submitError', function (data) {
  if(data.detail.xhr.status==422){
   var msg=JSON.parse(decodeURI(data.detail.xhr.responseText));
   for (var prop in msg) {
       if(msg.hasOwnProperty(prop)){
            $$('form#reg-form #'+prop+'-error').text(msg[prop][0]);
       }
   }
  }     
 }); 
 $$('form#reg-form').on('submitted', function () {
  myApp.popup('.popup-registrationsms');
 });
 $$('select#group').on('keyup keydown change', function () {    
  if ($$('select#group').val() === 'partner') {
   $$('.forUr').css('display', 'none');
   $$('.forFiz').css('display', 'block');
  } else {
   $$('.forUr').css('display', 'block');
   $$('.forFiz').css('display', 'none');
  }
  myApp.closePanel();
 });
 $$('.open-selectgroup').on('click', function () {
  myApp.popup('.popup-selectgroup');
 });
});

        // Ajax submit on forms
$$(document).on('submit change', 'form.vajax-submit, form.vajax-submit-onchange', function (e) {
            var form = $$(this);
            if (e.type === 'change' && !form.hasClass('ajax-submit-onchange')) return;
            if (e.type === 'submit') e.preventDefault();
        
            var method = (form.attr('method') || 'GET').toUpperCase();
        
            var url = form.attr('action');
            if (!url) return;
        
            var data;
            if (method === 'POST') data = new FormData(form[0]);
            else data = $$.serializeObject(app.formToJSON(form[0]));
        
            var xhr = $$.ajax({
                method: method,
                url: url,
                data: data,
                headers:{'Accept':'application/json', 'X-Requested-With':'XMLHttpRequest'},
                crossDomain:true,
                dataType:'json',
                contentType:'application/x-www-form-urlencoded',
                beforeSend: function (xhr) {
                    form.trigger('beforeSubmit form:beforesend', {data:data, xhr: xhr});
                },
                error: function (xhr) {
                    form.trigger('submitError form:error', {data:data, xhr: xhr});
                },
                success: function (data) {
                    form.trigger('submitted form:success', {data: data, xhr: xhr});
                }
            });
        });
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    if(page.name!=='index'){
    myApp.closePanel();
    }
    if (vicFunc.isLogin()) {        
    $$('.smart-select-popup').on('close', function(){ 
        myApp.openPanel('right');      
     });
     }
});
$$(document).on('pageBack', function () {
    if (!vicFunc.isLogin()) {
      mainView.router.loadPage('index.html');
    }
});


/*popup window*/
$$('#activation-form').attr('action', serverpath+'activation/');    
$$('form#activation-form').on('submitted', function (data,status, xhr) {
    myApp.closeModal('.popup-registrationsms');
    vicFunc.openInfoPopup(lang.good_activation);
    mainView.router.loadPage('index.html');
     vicFunc.setAccessToken(xhr, data);
  //  mainView.router.loadPage('pages/map.html');  
});
$$('form#activation-form').on('submitError', function () {
    myApp.closeModal('.popup-registrationsms');
    vicFunc.openInfoPopup(lang.bad_activation);
});
//logic_restore_password
$$('#newpasswordstep1').on('click', function () {
   myApp.popup('.popup-newpasswordphone');
});
$$('#newpasswordstep2').on('click', function () {
   myApp.closeModal('.popup-newpasswordphone');
   myApp.popup('.popup-newpasswordsms');
});
$$('#newpasswordstep3').on('click', function () {
   myApp.closeModal('.popup-newpasswordsms');
   myApp.popup('.popup-newpasswordconfirm');
});
$$('#newpasswordstep4').on('click', function () {
   myApp.closeModal('.popup-newpasswordconfirm');
   vicFunc.openInfoPopup(lang.password_cange);
});

$$('.city_search').keyup( function () {    
    var value_seach = $$(this).val();
    if(value_seach.length > 3 && cityIsSearched===0){
       vicFunc.activeCitySearch=$$(this);
       cityIsSearched=1;
       vicFunc.getdataserver('cities_search','', value_seach);       
    }
});
$$('#per_km').on('change', function(){
    if($$(this).prop('checked')===true){
        $$('#perkm').html('RUB/KM');
    }else{
        $$('#perkm').html('RUB');
    }
});


$$('#search_save').on('click', function(){
    var data={};
    if($$('#search_begin_id').val()>0){
    data.from_city=$$('#search_begin_id').val();
    }
    if($$('#search_end_id').val()>0){
    data.to_city=$$('#search_end_id').val();
    }
   if($$('#calendar_date_from').val()!==''){
    data.loading_date_from=$$('#calendar_date_from').val();
    }
   if($$('#calendar_date_to').val()!==''){  
    data.loading_date_to=$$('#calendar_date_to').val();
    }
    var only_cars=0;
    if($$('#only_cars').prop('checked')===true){
    only_cars=1;    
    data.only_my_cars=only_cars;
    }
    var only_my_subscriptions=0;
    if($$('#only_subscribe').prop('checked')===true){only_my_subscriptions=1;        
    data.only_my_subscriptions=only_my_subscriptions;
    }
     if($$('#weight_from').val()!==''){ 
    data.weight_from=$$('#weight_from').val();
     }
    if($$('#weight_to').val()!==''){ 
    data.weight_to=$$('#weight_to').val();
    }
     if($$('#width_from').val()!==''){ 
    data.width_from=$$('#width_from').val();
     }
    if($$('#width_to').val()!==''){ 
    data.width_to=$$('#width_to').val();
    }    
    if($$('#length_from').val()!==''){ 
    data.length_from=$$('#length_from').val();
    }
    if($$('#length_to').val()!==''){             
    data.length_to=$$('#length_to').val();
     }
    if($$('#volume_from').val()!==''){  
    data.volume_from=$$('#volume_from').val();
    }
    if($$('#volume_to').val()!==''){      
    data.volume_to=$$('#volume_to').val();
    }
    if($$('#height_from').val()!==''){      
    data.height_from=$$('#height_from').val();
    }
    if($$('#height_to').val()!==''){
    data.height_to=$$('#height_to').val();
    }
    if($$('#rate_search').val()!==''){   
    data.carrier_rate=$$('#rate_search').val();
    } 
    data.carrier_rate_type=$$('#carrier_rate_type').val();
    var cargotypes=[];
  
    $$('select#cargo_type option').each(function(){
        if($$(this)[0].selected===true){cargotypes.push($$(this).val());}
    });
    data.cargo_type=cargotypes;    
    var cartypes=[];
    $$('select#car_type option').each(function(){
        if($$(this)[0].selected===true){cartypes.push($$(this).val());}
    });   
    data.car_type=cartypes;
    
    var car_out=[];  
    $$('select#car_out option').each(function(){
        if($$(this)[0].selected===true){ car_out.push($$(this).val());}
    });   
   data.car_out=car_out;
        
    var car_in=[];  
    $$('select#car_in option').each(function(){
        if($$(this)[0].selected===true){car_in.push($$(this).val());}
    });   
    data.car_in=car_in;
//showlog(data);
if(myApp.mainView.activePage.name==='map'){
    vicFunc.getdataserver('map', data);
}
 if(myApp.mainView.activePage.name==='list'){
     vicFunc.getdataserver('list_search', data);
    }
    });


function geolocationSuccess(position){
	lat=position.coords.latitude;
	lng=position.coords.longitude;
	if(myApp.mainView.activePage.name==='map' && myMap!==false){
		myMap.setCenter(lat, lng, 10);	
	myMap.geoObjects.remove(selfPosition);
   selfPosition = new ymaps.GeoObject({
        geometry: {
          type: "Point",
		  preset:'islands#blueCircleDotIcon',
          coordinates: [lat, lng] 
       }
       });
		myMap.geoObjects.add(selfPosition); 
		} 
	}    