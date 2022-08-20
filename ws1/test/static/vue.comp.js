const dashboard = Vue.component('dashboard', {
    template: `
    <div>
    <p align="right"><a class="btn btn-outline-primary btn-sm" href="/" role="button"><b>Logout</b></a></p>
	 <h1 class="display-3">Welcome {{uid}}! </h1>   
	 <div class="container">
	 	<div class="row">
	 		<div class="col-4"><div class="p-4">
	    	  	<h2> Tracker</h2>
	    	</div></div>
	    	<div class="col-4"><div class="p-4">
	      		<h2> Last Tracked</h2>
	    	</div></div>
	    </div>

	    <div v-for=" t in record">
	    	<div class="row">
	    		<div class="col-4"><div class="p-3">
	    			{{ t["name"] }}
	    		</div></div>

	    		<div class="col-4"><div class="p-3">
	    			{{ t["last_update"] }}
	    		</div> </div>

	    		<div class="col-2"><div class="p-3">
	    			<button class="btn btn-outline-primary btn-sm" @click="add_log(t.id, t.ttype, t.options)"><b>+</b></button>
	    		</div></div>

	    		<div class="col-2"><div class="p-3">
					<div class="btn-group">
						<button type="button" class="btn btn-primary" @click="view_track">View</button>
						<button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				  			
						</button>
						<div class="dropdown-menu">
						  <a class="dropdown-item" @click="edit_track(t.id, t.ttype, t.desc, t.name, t.options)">Edit</a>
						  <a class="dropdown-item" @click="delete_track(t.id)">Delete</a>
						  <div class="dropdown-divider"></div>
						  <a class="dropdown-item">Export</a>
						</div>
					</div>
	    		</div></div>
	    	</div>
	    </div>


	    	<div class="row justify-content-center">
	    	<div class="col-6"><div class="p-5">
	    	<center><button class="btn btn-primary btn-lg" @click="add_track" ><h4>ADD Tracker</h4></button></center>
	    	</div>	</div> 
	    	</div>
	 </div>

    </div>
    `,
	data: function() {
        return {
            uid: undefined,
            record: undefined}
        },
	methods: {
			edit_track: function(tid,ttype, desc,name,opts){
				console.log("edit");
				this.$router.push({ name: 'edittracker', params: { 'tid': tid,'tttype': ttype, 'tdesc': desc, 'tname': name,'toptions': opts}})

			},
			delete_track: function(tid){
				console.log("delete");
				fetch('http://127.0.0.1:5000/api/tracker/delete/'+tid, {method: "DELETE"})
				.then(resp => resp.json())
				.then(data => console.log(data));
				var i = 0;
				while (i < this.record.length) {
				if (this.record[i].id == tid) {
					this.record.splice(i, 1);
				} else {
					++i;
				}
				}

			},

			view_track: function(){
				console.log("view")
			},
			add_track: function(){
				this.$router.push({ name: 'newtracker', params: { 'uid': this.uid}})
			},
			add_log: function(tid, type, opts){
				try {
					let optarr= opts.split(",")
				
				this.$router.push({ name: 'newlog', params: { 'tid': tid, 'ttype': type, 'options': optarr}})
				} catch (error) {
					this.$router.push({ name: 'newlog', params: { 'tid': tid, 'ttype': type}})
				}
				
			}
		},

    created: function(){
	fetch('http://127.0.0.1:5000/api/user')
	.then(resp => resp.json())
	.then(data => {
		this.uid = data.uid;
		return fetch('http://127.0.0.1:5000/api/tracker/'+this.uid)
	})
    .then(resp => resp.json())
	.then(data => this.record = data)
	.catch(err => console.log(err.message))
    }
	
}

)


const newtracker= Vue.component('newtracker', {
	props: ['uid'],

	data: function(){
		return {
			name: undefined,
			ttype: undefined,
			desc: undefined,
			options: null,
			}
	},

	template: 
	`
	<div>

    <h1 class="display-4">New Tracker </h1>
		<div class="container">	

    <div class="row ">	
    <div class="col-4"><div class= "p-4">	
    <label for= "tname_input" class="form-label"> Tracker Name: </label>
    </div></div>
    <div class="col-8"><div class= "p-4">	
    <input type="text" v-model="name" id="name" required>
    </div>
    </div>
    </div>		

    <div class="row">
    <div class="col-4"><div class= "p-4">
    <label for= "note_input" class="form-label"> Description: </label>
    </div></div>
    <div class="col-8"><div class= "p-4">
    <textarea class="form-control" v-model="desc" id="desc" rows="2" name="desc" placeholder="Write something..."></textarea>
    </div>
    </div>
    </div>		

    <div class="row">
    <div class="col-4"><div class= "p-4">
    <label for= "value_input" class="form-label"> Tracker type: </label>
    </div></div>
    <div class="col-8"><div class= "p-4">
    <select class="form-select" aria-label="Default select example" v-model="ttype" required>
	<option selected hidden disabled value="">Select option</option>
     <option value="1">Number</option>
     <option value="2">Multiple Choice</option>
     <option value="3">Time Duration</option>
    </select>
    </div>
    </div>
    </div>		

    <div class="row ">	
    <div class="col-4"><div class= "p-4">	
    <label for= "settings_input" class="form-label"> Additional input(for multiple choice option): </label>
    </div></div>
    <div class="col-8"><div class= "p-4">	
    <input type="text" clas="form-control" id="options" v-model="options" name= "settings">
    </div>
    </div>
    </div>		
    <div class="row justify-content-center">
    <div class="col-4">
    <button @click="send" class="btn btn-primary btn-lg">Submit</button>
    </div>
    </div>		
</div>
	</div>
	`,
	methods: {
		send: function(){
        fetch('http://127.0.0.1:5000/api/tracker',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'name': this.name,'uid':this.uid, 'ttype':this.ttype, 'desc':this.desc, 'options':this.options })
		})
		.then(resp => resp.json())
		.then(data => console.log(data));
		this.$router.push({name: 'dashboard'})
		}
	},
	
})


const newlog = Vue.component('newlog', {
	props: ['tid', 'ttype', 'options'],
	data: function(){
		return {
			value: undefined,
			time: undefined,
			notes: undefined,
			flag1: true,
			flag2: true,
			flag3: true
		}
	},

	template: 
	`
	<div>
	<h1 class="display-4">Hello </h1>
		<div class="container">
		<div class="row">
		<div class="col-8">
		</div>
		</div>
		<div>	
		<div class="row ">	
		<div class="col-4"><div class= "p-4">	
		<label for= "time"> Timestamp: </label>
		</div></div>
		<div class="col-8"><div class= "p-4">	
		<input type="datetime-local"  id="time" name= "time" v-model="time">
		</div>
		</div>
		</div>		
		<div class="row">
		<div class="col-4"><div class= "p-4">
		<label for= "value"> Value: </label>
		</div></div>
		<div class="col-3"><div class= "p-4">
		<input type="text" :class="{hideclass: flag1}" id="value1" v-model="value" name= "value" required>
		
		<select :class="{hideclass: flag2}" aria-label="list_input" id= "value2" v-model="value" name="value" required>
		 <option selected hidden disabled value="">Select option</option>
		 <option v-for="i in options"  >{{ i }}</option>
		</select>
		</div>
		</div>		
		
		<div class="row">
		<div class="col-4"><div class= "p-4">
		<label for= "note_input" class="form-label"> Notes: </label>
		</div></div>
		<div class="col-6"><div class= "p-4">
	
		<textarea class="form-control" id="note_input" rows="2" name="notes" v-model="notes" placeholder="Write something..."></textarea>
		</div>
		</div>
		</div>		
		<div class="row justify-content-center">
		<div class="col-4">
		<button  class="btn btn-primary btn-lg" @click="send" >Submit</button>
		</div>
		</div>		
	</div>
		</div>
		</div>
		</div>
	`,
	methods: {
		send: function(){
        fetch('http://127.0.0.1:5000/api/log',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'tid': this.tid, 'time': this.time,'value':this.value, 'notes':this.notes })
		})
		.then(resp => resp.json())
		.then(data => console.log(data));
		this.$router.push({name: 'dashboard'})

		}
	},
	created: function(){
		var today = new Date();
		var yyyy = today.getFullYear();
		var mm= today.getMonth()+1;
		if (mm < 10){
			mm= '0'+ mm;
		}
		var dd= today.getDate();
		if (dd < 10){
			dd= '0'+ dd;
		}
		var hh = today.getHours() ;
		if (hh < 10){
			hh= '0'+ hh;
		}
		var mn = today.getMinutes();
		if (mn < 10){
			mn= '0'+ mn;
		}
		var dateTime = yyyy+'-'+mm+'-'+dd+'T'+hh+':'+mn;
		this.time= dateTime;
		if (this.ttype == 1){
			this.flag1 = false;
		}
		if (this.ttype == 2){
			this.flag2 =false;
		}
		if (this.ttype == 3){
			this.flag3 =false;
		}
	}

})

const edittracker= Vue.component('edittracker', {
	props: ['tid', 'tttype', 'tdesc', 'tname', 'toptions'],

	data: function(){
		return {
			name: undefined,
			ttype: undefined,
			desc: undefined,
			options: null,
			}
	},

	template: 
	`
	<div>

    <h1 class="display-4">Edit Tracker </h1>
		<div class="container">	

    <div class="row ">	
    <div class="col-4"><div class= "p-4">	
    <label for= "tname_input" class="form-label"> Tracker Name: </label>
    </div></div>
    <div class="col-8"><div class= "p-4">	
    <input type="text" v-model="name" id="name" required>
    </div>
    </div>
    </div>		

    <div class="row">
    <div class="col-4"><div class= "p-4">
    <label for= "note_input" class="form-label"> Description: </label>
    </div></div>
    <div class="col-8"><div class= "p-4">
    <textarea class="form-control" v-model="desc" id="desc" rows="2" name="desc" placeholder="Write something..."></textarea>
    </div>
    </div>
    </div>		

    <div class="row">
    <div class="col-4"><div class= "p-4">
    <label for= "value_input" class="form-label"> Tracker type: </label>
    </div></div>
    <div class="col-8"><div class= "p-4">
    <select class="form-select" aria-label="Default select example" v-model="ttype" required>
	<option selected hidden disabled value="">Select option</option>
     <option value="1">Number</option>
     <option value="2">Multiple Choice</option>
     <option value="3">Time Duration</option>
    </select>
    </div>
    </div>
    </div>		

    <div class="row ">	
    <div class="col-4"><div class= "p-4">	
    <label for= "settings_input" class="form-label"> Additional input(for multiple choice option): </label>
    </div></div>
    <div class="col-8"><div class= "p-4">	
    <input type="text" clas="form-control" id="options" v-model="options" name= "settings">
    </div>
    </div>
    </div>		
    <div class="row justify-content-center">
    <div class="col-4">
    <button @click="send" class="btn btn-primary btn-lg">Submit</button>
    </div>
    </div>		
</div>
	</div>
	`,
	methods: {
		send: function(){
        fetch('http://127.0.0.1:5000/api/tracker',{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'name': this.name,'tid':this.tid, 'ttype':this.ttype, 'desc':this.desc, 'options':this.options })
		})
		.then(resp => resp.json())
		.then(data => console.log(data));
		this.$router.push({name: 'dashboard'})

		}
	},
	created: function(){
		this.name= this.tname;
		this.ttype= this.tttype;
		this.desc= this.tdesc;
		this.options= this.toptions
	}
	
})


const routes = [
	{
		path: '/',
		component: dashboard,
		name: 'dashboard'
	}, {
		path: '/new_tracker',
		component: newtracker,
		name: 'newtracker',
		props: true
	}, {
		path: '/new_log',
		component: newlog,
		name: 'newlog',
		props: true
	},{
		path: '/edit_tracker',
		component: edittracker,
		name: 'edittracker',
		props: true
	}
]


const router = new VueRouter({
	routes
})

var app= new Vue({
	router: router,
    el: '#app'
})