<template>
  <div id="map">
    地图如下：
    <div class="baidumap" id="allmap"></div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name:'map',
    mounted: function () {
      this.baiduMap();
    },
    methods: {
      baiduMap: function () {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(113.429193, 23.185021);
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        map.centerAndZoom(point, 14);
        map.addEventListener("click", function (e) {
          alert(e.point.lng + " | " + e.point.lat);
          }
        );
        map.enableScrollWheelZoom();
        map.enableContinuousZoom();

        var circle = new BMap.Circle(point, 500, {
          strokeColor: "blue",
          strokeWeight: 1,
          fillColor: "#E2E8F1",
          fillOpacity: 0.6
        });
        //画到地图上面
        map.addOverlay(circle);
      }
    }
  }
</script>

<style scoped>
  .baidumap {
    width: 100%;
    height: 400px;
  }
</style>
