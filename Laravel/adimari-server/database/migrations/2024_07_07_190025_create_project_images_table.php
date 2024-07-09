<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectImagesTable extends Migration
{
    public function up()
    {
        Schema::create('project_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->string('image_url');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('project_images');
    }
}
