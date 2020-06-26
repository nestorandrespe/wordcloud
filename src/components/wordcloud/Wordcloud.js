import React, {Component} from 'react'

class Wordcloud extends Component {
    constructor(props){
        super(props)

        this.state = {
            canvas: null,
            ctx: null
        }

        this.canvas = React.createRef();

        this.checkIsAvailable = this.checkIsAvailable.bind(this)
        this.updateCanvas = this.updateCanvas.bind(this)
    }

    componentDidMount() {
        var canvas = this.canvas.current
        var ctx = canvas.getContext('2d', {willReadFrequently: true})
        
        this.setState({
            canvas: canvas,
            ctx: ctx
        })

    }

    componentDidUpdate(){
        this.updateCanvas()
    }

    updateCanvas() {
        var ocupied = []
        var aroundSpace = 50

        for(var i = 0;i<this.props.list.length; i++){
            if(ocupied.length > 0){
                var boundary = this.getTextCanvas(this.props.list[i][0], this.props.list[i][1])
                var cw = this.props.width
                var ch = this.props.height

                var bcw = 0
                var bch = 0

                var random_x = 0
                var random_y = 0

                var tries = 0
                var max_tries = 20
                while(tries < max_tries){
                    // random_x = boundary[0]/2 + Math.random() * (cw - boundary[0])
                    // random_y = boundary[1]/2 + Math.random() * (ch - boundary[1])
                    bcw = cw / 2 - aroundSpace / 2
                    if(aroundSpace > ch - 30) {
                        bch = ch/2 - 30
                    } else {
                        bch = ch / 2 - aroundSpace / 2
                    }

                    random_x = bcw + Math.random() * aroundSpace
                    random_y = bch + Math.random() * aroundSpace

                    if(this.checkIsAvailable(ocupied, random_x, random_y, boundary[0] + 5, boundary[1] + 5)){

                        this.state.ctx.fillStyle = this.props.color
                        this.state.ctx.globalAlpha = (0.8/i) + 0.2
                        this.state.ctx.font = this.props.list[i][1] + "px Arial"
                        this.state.ctx.textAlign = "center";
                        this.state.ctx.textBaseline = "middle";
                        this.state.ctx.fillText(this.props.list[i][0].toUpperCase(), random_x, random_y)

                        ocupied.push([random_x,random_y,boundary[0] + 5, boundary[1] + 5])

                        break
                    } else if(tries == max_tries-1 && aroundSpace < cw / 2){
                        aroundSpace += 50
                        tries = 0

                        console.log(tries)
                    }
                    tries++
                }

            }
            else{
                var boundary = this.getTextCanvas(this.props.list[i][0], this.props.list[i][1])
                var mx = this.props.width / 2
                var mh = this.props.height / 2

                this.state.ctx.fillStyle = this.props.color
                this.state.ctx.font = this.props.list[i][1] + "px Arial"
                this.state.ctx.textAlign = "center";
                this.state.ctx.textBaseline = "middle";
                this.state.ctx.fillText(this.props.list[i][0].toUpperCase(), mx, mh)

                // this.state.ctx.beginPath();
                // this.state.ctx.rect(mx-boundary[0]/2,mh-boundary[1]/2,boundary[0], boundary[1]);
                // this.state.ctx.stroke();

                ocupied.push([mx,mh,boundary[0] + 5, boundary[1] + 5])
            }
        }

        
        
    }

    checkIsAvailable(ocupied,x,y,w,h) {
        var resp = true
        // console.log(x,y,w,h)
        for(var i = 0; i < ocupied.length; i++){
            var test = false
            var l1 = {
                x: x - w/2,
                y: y - h/2
            }

            var r1 = {
                x: x + w/2,
                y: y + h/2
            }

            var l2 = {
                x: ocupied[i][0] - ocupied[i][2]/2,
                y: ocupied[i][1] - ocupied[i][3]/2
            }

            var r2 = {
                x: ocupied[i][0] + ocupied[i][2]/2,
                y: ocupied[i][1] + ocupied[i][3]/2
            }

            // console.log(l1,r1,l2,r2)

            // this.state.ctx.beginPath();
            // this.state.ctx.rect(l1.x,l1.y,w,h);
            // this.state.ctx.stroke();

            if(l1.x > r2.x || l2.x > r1.x){
                test = true
            }
            if(l1.y > r2.y || l2.y > r1.y){
                test = true
            }
            if(r1.x >= this.props.width) test = false

            if(!test){
                resp = false
                break
            }
        }
        return resp
    }

    getTextCanvas(string, size) {
        var canvas = document.createElement('canvas');
        if (!canvas || !canvas.getContext) {
          return false;
        }
    
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = '#000';
        ctx.font = size + "px Arial";

        var w = ctx.measureText(string.toUpperCase()).width
        var h = ctx.measureText(string.toUpperCase()).actualBoundingBoxAscent

        canvas.setAttribute('width', w)
        canvas.setAttribute('height', h)

        ctx.fillStyle = '#000';
        ctx.font = size + "px Arial";
        ctx.fillText(string.toUpperCase(), 0, h);
        
        // document.body.appendChild(canvas);

        return [w,h]
    }

    render(){
        return (
            <>
                <canvas ref={this.canvas} width={this.props.width} height={this.props.height} />
            </>
        )
    }
}

export default Wordcloud