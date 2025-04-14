<script lang="ts">
    let {
        maxRating = 5, // Setting to 5 for 5 stars
        rating = $bindable(0),
        size = "md",
        disabled = false,
        readonly = false,
        showValue = true,
        color = "text-yellow-400",
        inactiveColor = "text-gray-300",
        hoverColor = "text-yellow-300",
    }: {
        rating?: number;
        maxRating?: number;
        size?: string;
        disabled?: boolean;
        readonly?: boolean;
        showValue?: boolean;
        color?: string;
        inactiveColor?: string;
        hoverColor?: string;
    } = $props();

    // Local state for hover
    let hoveredRating = $state(0);

    // Calculate star sizes
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-10 h-10",
    };

    const starSize =
        sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.md;

    // Generate stars array for rendering - using maxRating directly for number of stars
    const starsArray = Array.from({ length: maxRating }, (_, i) => i + 1);

    // Handle mouse hover
    function handleMouseEnter(value: number) {
        if (disabled || readonly) return;
        hoveredRating = value;
    }

    function handleMouseLeave() {
        if (disabled || readonly) return;
        hoveredRating = 0;
    }

    // Handle click to set rating
    function handleClick(value: number) {
        if (disabled || readonly) return;
        rating = value === rating ? 0 : value; // Toggle off if clicking the same value
    }

    // Handle hover for half stars
    function handleHalfStarHover(value: number, isLeft: boolean) {
        if (disabled || readonly) return;
        hoveredRating = isLeft ? value - 0.5 : value;
    }

    // Determine star fill level based on rating and hover state
    function getStarFill(starValue: number): string {
        const currentRating = hoveredRating || rating;

        if (currentRating >= starValue) {
            return "full";
        } else if (currentRating >= starValue - 0.5) {
            return "half";
        } else {
            return "empty";
        }
    }
</script>

<div class="flex flex-col items-center gap-2">
    <div
        role="none"
        class="flex items-center gap-1"
        onmouseleave={handleMouseLeave}
        class:opacity-70={disabled}
    >
        {#each starsArray as starValue}
            {@const fillType = getStarFill(starValue)}

            <div class="relative">
                <!-- Left half of star for half-star hovering -->
                <div
                    role="none"
                    class="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
                    onmouseenter={() => handleHalfStarHover(starValue, true)}
                    onclick={() => handleClick(starValue - 0.5)}
                ></div>

                <!-- Right half of star for full-star hovering -->
                <div
                    role="none"
                    class="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
                    onmouseenter={() => handleHalfStarHover(starValue, false)}
                    onclick={() => handleClick(starValue)}
                ></div>

                <!-- Actual star SVG -->
                <div class="pointer-events-none">
                    {#if fillType === "full"}
                        <svg
                            class={`${starSize} ${hoveredRating && !readonly ? hoverColor : color}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2l2.2 6.6h7.1l-5.7 4.2 2.2 6.6-5.8-4.2-5.7 4.2 2.2-6.6-5.8-4.2h7.1z"
                            />
                        </svg>
                    {:else if fillType === "half"}
                        <svg
                            class={`${starSize} ${hoveredRating && !readonly ? hoverColor : color}`}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient
                                    id={`halfStar-${starValue}`}
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop
                                        offset="50%"
                                        stop-color="currentColor"
                                    />
                                    <stop
                                        offset="50%"
                                        stop-color="transparent"
                                    />
                                </linearGradient>
                            </defs>
                            <path
                                fill={`url(#halfStar-${starValue})`}
                                stroke="currentColor"
                                stroke-width="1"
                                d="M12 2l2.2 6.6h7.1l-5.7 4.2 2.2 6.6-5.8-4.2-5.7 4.2 2.2-6.6-5.8-4.2h7.1z"
                            />
                        </svg>
                    {:else}
                        <svg
                            class={`${starSize} ${inactiveColor}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 2l2.2 6.6h7.1l-5.7 4.2 2.2 6.6-5.8-4.2-5.7 4.2 2.2-6.6-5.8-4.2h7.1z"
                            />
                        </svg>
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <!-- {#if showValue && rating > 0}
        <div class="text-sm font-medium">
            Rating: {rating.toFixed(1)}
        </div>
    {/if} -->
</div>
