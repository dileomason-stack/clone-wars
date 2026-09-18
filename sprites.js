window.SPRITES = {
  drawBackground(ctx, width, height, time) {
    ctx.save();
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#090d2a');
    sky.addColorStop(0.62, '#182a57');
    sky.addColorStop(1, '#3d2c55');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#f6e7a6';
    ctx.beginPath();
    ctx.arc(width * 0.78, height * 0.18, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#090d2a';
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.16, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#d7e2ff';
    const stars = [[22, 46], [70, 88], [126, 34], [182, 72], [236, 42], [305, 96], [342, 54], [274, 136]];
    for (const star of stars) {
      const pulse = 1 + Math.sin(time * 1.4 + star[0]) * 0.18;
      ctx.beginPath();
      ctx.arc(star[0], star[1], 1.5 * pulse, 0, Math.PI * 2);
      ctx.fill();
    }

    const skylineY = height - 126;
    ctx.fillStyle = '#101936';
    ctx.fillRect(0, skylineY, width, 126);
    const buildings = [[0, 72, 34], [38, 44, 29], [72, 87, 34], [111, 28, 38], [154, 62, 32], [190, 22, 42], [237, 70, 32], [273, 38, 39], [318, 56, 42]];
    for (const building of buildings) {
      const x = building[0];
      const y = skylineY + building[1];
      const w = building[2];
      ctx.fillRect(x, y, w, height - y);
      ctx.fillStyle = '#e6bd63';
      for (let row = y + 12; row < height - 10; row += 18) {
        ctx.fillRect(x + 7, row, 4, 6);
        if (w > 28) ctx.fillRect(x + w - 11, row, 4, 6);
      }
      ctx.fillStyle = '#101936';
    }
    ctx.restore();
  },

  drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();
    const top = height - groundHeight;
    ctx.fillStyle = '#222b42';
    ctx.fillRect(0, top, width, groundHeight);
    ctx.fillStyle = '#f3c969';
    ctx.fillRect(0, top, width, 5);
    ctx.strokeStyle = '#0a1024';
    ctx.lineWidth = 3;
    const tile = 34;
    const shift = -(offset % tile);
    for (let x = shift - tile; x < width + tile; x += tile) {
      ctx.beginPath();
      ctx.moveTo(x, top + 8);
      ctx.lineTo(x + tile * 0.65, height);
      ctx.stroke();
    }
    ctx.restore();
  },

  drawBird(ctx, x, y, size, velocity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.max(-0.32, Math.min(0.55, velocity / 900)));
    const scale = size / 34;
    ctx.scale(scale, scale);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#111827';
    ctx.fillStyle = '#d7dde8';
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#aeb8ca';
    ctx.beginPath();
    ctx.ellipse(-3, 4, 9, 5, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#f0f3f8';
    ctx.beginPath();
    ctx.arc(9, -6, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#f0a23a';
    ctx.beginPath();
    ctx.moveTo(16, -5);
    ctx.lineTo(24, -2);
    ctx.lineTo(16, 1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#101828';
    ctx.beginPath();
    ctx.arc(11, -8, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();
    const drawBuilding = (top, bottom) => {
      const buildingHeight = bottom - top;
      ctx.fillStyle = '#4167a8';
      ctx.strokeStyle = '#080f27';
      ctx.lineWidth = 3;
      ctx.fillRect(x, top, pipeWidth, buildingHeight);
      ctx.strokeRect(x + 1.5, top + 1.5, pipeWidth - 3, Math.max(0, buildingHeight - 3));
      ctx.fillStyle = '#f4d06f';
      for (let row = top + 12; row < bottom - 8; row += 18) {
        ctx.fillRect(x + 9, row, 6, 7);
        if (pipeWidth > 40) ctx.fillRect(x + pipeWidth - 15, row, 6, 7);
      }
      ctx.fillStyle = '#243e78';
      ctx.fillRect(x - 4, top, pipeWidth + 8, Math.min(10, buildingHeight));
      ctx.strokeRect(x - 4, top, pipeWidth + 8, Math.min(10, buildingHeight));
    };
    drawBuilding(0, gapTop);
    drawBuilding(gapBottom, height);
    ctx.restore();
  }
};
