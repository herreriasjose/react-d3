import React, { Component } from "react";
import "./Map.css";
import * as d3 from "d3";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.size[0],
      height: props.size[1],
      cluster: 1,
      file: "cluster1.json"
    };
    this.createForceMap = this.createForceMap.bind(this);
  }
  componentDidMount() {
    this.createForceMap();
  }
  componentDidUpdate() {
    this.createForceMap();
  }

  swtichCluster = newCluster => {
    if (newCluster === 1) {
      this.setState({
        cluster: 1,
        file: "cluster1.json"
      });
    } else if (newCluster === 2) {
      this.setState({
        cluster: 2,
        file: "cluster2.json"
      });
    }
  };

  createForceMap() {
    const node = this.node;
    var svg = d3.select(node);

    svg.selectAll("*").remove();

    var force = d3
      .forceSimulation()
      .force(
        "charge",
        d3
          .forceManyBody()
          .strength(-700)
          .distanceMin(100)
          .distanceMax(1000)
      )
      .force(
        "link",
        d3.forceLink().id(function(d) {
          return d.index;
        })
      )
      .force(
        "center",
        d3.forceCenter(this.state.width / 2, this.state.height / 2)
      )
      .force("y", d3.forceY(0.001))
      .force("x", d3.forceX(0.001));

    d3.json(this.state.file, function(error, json) {
      if (error) throw error;
      force
        .nodes(json.nodes)
        .force("link")
        .links(json.links);

      var link = svg
        .selectAll(".link")
        .data(json.links)
        .enter()
        .append("line")
        .attr("class", "link");

      var node = svg
        .selectAll(".node")
        .data(json.nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

      var color = function(group) {
        if (group === 1) {
          return json.colors[0];
        } else if (group === 2) {
          return json.colors[1];
        } else {
          return json.colors[2];
        }
      };

      function dragstarted(d) {
        if (!d3.event.active) force.alphaTarget(0.5).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) force.alphaTarget(0.5);
        d.fx = null;
        d.fy = null;
      }

      node
        .append("circle")
        .attr("r", 13)
        .attr("fill", function(d) {
          return color(d.group);
        });

      node
        .append("text")
        .attr("dx", -18)
        .attr("dy", 8)
        .style("font-family", "Arial")
        .style("font-size", "16px")

        .text(function(d) {
          return d.name;
        });

      force.on("tick", function() {
        link
          .attr("x1", function(d) {
            return d.source.x;
          })
          .attr("y1", function(d) {
            return d.source.y;
          })
          .attr("x2", function(d) {
            return d.target.x;
          })
          .attr("y2", function(d) {
            return d.target.y;
          });
        node.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      });
    });
  }

  render() {
    return (
      <div>
        <div className="">
          <h6 className="d-flex justify-content-center">Graph using a force layout: Cluster {this.state.cluster}</h6>
         
          <svg
            ref={node => (this.node = node)}
            width={this.state.width}
            height={this.state.height}
          />
      
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="c1 btn btn-primary btn-lg"
            onClick={this.swtichCluster.bind(this, 1)}
          >
            Cluster 1
          </button>
          <button
            className="c2 btn btn-primary btn-lg"
            onClick={this.swtichCluster.bind(this, 2)}
          >
            Cluster 2
          </button>
        </div>
      </div>
    );
  }
}

export default Map;
